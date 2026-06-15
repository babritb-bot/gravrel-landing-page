from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT', 'support@gravrel.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ===== Models =====
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    source: str = "contact_form"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    message: str = Field(min_length=1, max_length=5000)


class NewsletterCreate(BaseModel):
    email: EmailStr


# ===== Helpers =====
def build_email_html(submission: ContactSubmission) -> str:
    safe_msg = submission.message.replace("\n", "<br/>")
    phone_row = ""
    if submission.phone:
        phone_row = (
            f'<tr><td style="padding:6px 0;color:#9ca3af;font-size:13px;">Phone</td>'
            f'<td style="padding:6px 0;color:#e5e7eb;font-size:14px;">{submission.phone}</td></tr>'
        )
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f10;padding:32px 0;font-family:Helvetica,Arial,sans-serif;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0f1419;border:1px solid #1f2a30;border-radius:16px;padding:32px;">
          <tr><td>
            <div style="display:inline-block;background:#10b981;color:#ffffff;font-weight:700;padding:6px 14px;border-radius:999px;font-size:12px;letter-spacing:0.5px;">NEW LEAD · GRAVREL.COM</div>
            <h1 style="color:#ffffff;font-size:22px;margin:18px 0 8px;">New contact form submission</h1>
            <p style="color:#9ca3af;font-size:14px;margin:0 0 24px;">Someone reached out via the gravrel.com contact form.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1f2a30;padding-top:12px;">
              <tr><td style="padding:6px 0;color:#9ca3af;font-size:13px;width:120px;">Name</td>
                  <td style="padding:6px 0;color:#e5e7eb;font-size:14px;">{submission.name}</td></tr>
              <tr><td style="padding:6px 0;color:#9ca3af;font-size:13px;">Email</td>
                  <td style="padding:6px 0;color:#10b981;font-size:14px;">{submission.email}</td></tr>
              {phone_row}
              <tr><td style="padding:6px 0;color:#9ca3af;font-size:13px;">Submitted</td>
                  <td style="padding:6px 0;color:#e5e7eb;font-size:14px;">{submission.created_at.isoformat()}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#0a0f10;border:1px solid #1f2a30;border-radius:12px;">
              <div style="color:#9ca3af;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:8px;">Message</div>
              <div style="color:#e5e7eb;font-size:14px;line-height:1.6;">{safe_msg}</div>
            </div>
            <p style="color:#6b7280;font-size:12px;margin-top:24px;">Gravrel · Green Data Solutions</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_contact_email(submission: ContactSubmission) -> dict:
    params = {
        "from": SENDER_EMAIL,
        "to": [CONTACT_RECIPIENT],
        "reply_to": submission.email,
        "subject": f"New Gravrel lead — {submission.name}",
        "html": build_email_html(submission),
    }
    return await asyncio.to_thread(resend.Emails.send, params)


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "Gravrel API", "ok": True}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)

    email_status = "queued"
    try:
        result = await send_contact_email(submission)
        email_status = "sent"
        logger.info(f"Contact email sent: {result}")
    except Exception as e:
        email_status = "stored_only"
        logger.error(f"Resend send failed (submission still saved): {e}")

    return {
        "ok": True,
        "id": submission.id,
        "email_status": email_status,
    }


@api_router.post("/newsletter")
async def create_newsletter(payload: NewsletterCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.newsletter_subscribers.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
