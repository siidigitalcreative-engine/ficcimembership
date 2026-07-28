# FICCI Member Awareness Guide

A focused, one-page Next.js website for explaining how FICCI members can access and avail their membership benefits through the My Glue app.

## Included

- Mobile-responsive awareness guide
- My Glue download button
- Registered-email reminder
- Step-by-step member instructions
- In-store and online redemption guides
- Important reminders and FAQ
- FICCI support call-to-action
- Print / Save as PDF layout
- Environment-based links and contact details
- GitHub and Vercel-ready setup

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Customize

Edit `.env.local`:

```env
NEXT_PUBLIC_ORGANIZATION_NAME=FICCI
NEXT_PUBLIC_SUPPORT_EMAIL=membership@ficci.org.ph
NEXT_PUBLIC_SUPPORT_PHONE=
NEXT_PUBLIC_BENEFITS_DIRECTORY_URL=
NEXT_PUBLIC_MY_GLUE_DOWNLOAD_URL=https://www.glueup.com/download-my-glue
```

The benefits directory button appears only when `NEXT_PUBLIC_BENEFITS_DIRECTORY_URL` has a value.

To change the written guide, edit `app/page.tsx`. To change the design, edit `app/globals.css`.

## Deploy to Vercel

1. Create a new GitHub repository.
2. Upload all project files to the repository.
3. In Vercel, choose **Add New → Project**.
4. Import the GitHub repository.
5. Add the environment variables from `.env.example`.
6. Select **Deploy**.

No database, login, or external storage is required for this version.
