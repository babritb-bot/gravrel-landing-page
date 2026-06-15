"""Backend API tests for Gravrel website endpoints."""
import os
import sys
from pathlib import Path

import pytest
import requests
from dotenv import load_dotenv
from pymongo import MongoClient

# Load backend env to access MONGO_URL / DB_NAME for verification
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/') if os.environ.get('REACT_APP_BACKEND_URL') else None
if not BASE_URL:
    # fall back to frontend .env
    fe_env = Path('/app/frontend/.env')
    if fe_env.exists():
        for line in fe_env.read_text().splitlines():
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().rstrip('/')
                break

MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def mongo():
    cli = MongoClient(MONGO_URL)
    yield cli[DB_NAME]
    cli.close()


# ===== Health & root =====
class TestHealth:
    def test_health(self, api):
        r = api.get(f"{BASE_URL}/api/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data

    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True
        assert "message" in data


# ===== Contact endpoint =====
class TestContact:
    def test_contact_happy_path(self, api, mongo):
        payload = {
            "name": "TEST_Ada Lovelace",
            "email": "ada.test@example.com",
            "phone": "+91 99999 99999",
            "message": "TEST_pytest contact submission - happy path",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["email_status"] in ("sent", "stored_only", "queued")

        # Verify persistence in MongoDB
        doc = mongo.contact_submissions.find_one({"id": data["id"]})
        assert doc is not None, "Contact submission not persisted in MongoDB"
        assert doc["name"] == payload["name"]
        assert doc["email"] == payload["email"]
        assert doc["phone"] == payload["phone"]
        assert doc["message"] == payload["message"]
        assert doc["source"] == "contact_form"

    def test_contact_missing_required(self, api):
        # Missing message + email
        r = api.post(f"{BASE_URL}/api/contact", json={"name": "x"}, timeout=15)
        assert r.status_code == 422

    def test_contact_invalid_email(self, api):
        payload = {
            "name": "TEST_user",
            "email": "not-an-email",
            "message": "hello",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_no_phone_optional(self, api, mongo):
        payload = {
            "name": "TEST_NoPhone",
            "email": "nophone.test@example.com",
            "message": "TEST_no phone case",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        doc = mongo.contact_submissions.find_one({"id": data["id"]})
        assert doc is not None
        assert doc.get("phone") is None


# ===== Newsletter endpoint =====
class TestNewsletter:
    def test_newsletter_happy_path(self, api, mongo):
        payload = {"email": "test_newsletter@example.com"}
        r = api.post(f"{BASE_URL}/api/newsletter", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        doc = mongo.newsletter_subscribers.find_one({"id": data["id"]})
        assert doc is not None
        assert doc["email"] == payload["email"]

    def test_newsletter_invalid_email(self, api):
        r = api.post(f"{BASE_URL}/api/newsletter", json={"email": "not-an-email"}, timeout=15)
        assert r.status_code == 422

    def test_newsletter_missing_email(self, api):
        r = api.post(f"{BASE_URL}/api/newsletter", json={}, timeout=15)
        assert r.status_code == 422


# ===== Cleanup =====
@pytest.fixture(scope="session", autouse=True)
def _cleanup(mongo):
    yield
    try:
        mongo.contact_submissions.delete_many({"name": {"$regex": "^TEST_"}})
        mongo.newsletter_subscribers.delete_many({"email": {"$regex": "^test_newsletter"}})
    except Exception as e:
        print(f"Cleanup warning: {e}", file=sys.stderr)
