# Hostinger Deployment Files

This folder contains the production-ready static build of the Gravrel website, ready to upload to **Hostinger Premium Hosting** (or any static host).

## What's inside
- `index.html` — main entry point
- `static/` — bundled CSS and JS (with content hashes for caching)
- `asset-manifest.json` — build manifest
- `.htaccess` — Apache config for SPA routing + gzip + caching

> ⚠️ **Important:** `.htaccess` is a hidden file. After cloning from GitHub, confirm it's there with `ls -la dist-hostinger/`. If your local file manager hides dotfiles, enable "Show hidden files".

## How to deploy (5 minutes)

### 1. Pull latest from GitHub on your computer
```bash
git pull
```
or download the repo as a ZIP and extract.

### 2. Log in to Hostinger hPanel
https://hpanel.hostinger.com → click your **gravrel.com** hosting plan → **File Manager**

### 3. Open `public_html/`
This is the folder served at https://gravrel.com.

### 4. (Optional) Backup the current site
Select all files in `public_html/` → right-click → **Compress** → download the ZIP → keep it somewhere safe.

### 5. Delete everything inside `public_html/`
Select all → Delete. (Do NOT delete `public_html` itself, just its contents.)

### 6. Upload the contents of `dist-hostinger/`
- Click **Upload Files** in Hostinger File Manager
- Select **everything inside** `dist-hostinger/` (not the folder itself):
  - `.htaccess` ← important, hidden file
  - `index.html`
  - `asset-manifest.json`
  - `static/` (folder)
- Wait for upload to finish

### 7. Done
Visit **https://gravrel.com** — your new site is live. ✅

## Contact form note
The contact form opens the visitor's email client (`mailto:`) with the message pre-filled to `support@gravrel.com`. No backend / database / API keys needed — pure static.

## Rebuilding
If you make code changes later:
```bash
cd frontend
yarn install   # only first time
yarn build
```
Then copy `frontend/build/*` to `dist-hostinger/` and re-upload.
