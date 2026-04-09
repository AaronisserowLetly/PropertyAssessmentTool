# Property Assessment Tool

An internal web app for Letly property assessors to complete structured property visit reports. Assessors fill in a guided multi-step form on-site; the admin reviews all completed assessments via a password-protected dashboard.

---

## Tech Stack

| Layer | Service |
|---|---|
| Frontend / Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| File Storage | Supabase Storage |
| Hosting | Vercel |

---

## First-Time Setup

### 1. Clone the repo

```bash
git clone https://github.com/AaronisserowLetly/PropertyAssessmentTool.git
cd PropertyAssessmentTool
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to **SQL Editor** and paste + run the full contents of `supabase-setup.sql`
3. Go to **Storage → New Bucket**:
   - Name: `assessment-photos`
   - Public: **ON**
4. Back in **SQL Editor**, run these storage access policies:

```sql
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'assessment-photos');

CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT USING (bucket_id = 'assessment-photos');

CREATE POLICY "Allow public deletes" ON storage.objects
  FOR DELETE USING (bucket_id = 'assessment-photos');
```

### 3. Set environment variables

Create a `.env.local` file in the project root (never commit this):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PASSWORD=choose_a_secure_password
```

Find your Supabase keys at: **Project Settings → API**

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploying to Vercel

1. Push the repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add all four environment variables under **Project Settings → Environment Variables**
4. Deploy — Vercel auto-deploys on every push to `main`

---

## How It Works

### For Assessors (public)
- Land on `/` — click **Start New Assessment**
- Complete the 8-step form covering property details, exterior, interior, systems, red flags, location, notes, and photos
- Upload photos in the final step — photos are categorised (exterior, kitchen, bathrooms, etc.) and stored in Supabase Storage organised by property address
- Submit when complete

### For Admin
- Go to `/admin` (or click the small "Admin Login →" link at the bottom of the home page)
- Enter the admin password (set via `ADMIN_PASSWORD` env var)
- View all submitted assessments, scores, and red flags
- Click any assessment to review the full report and photos

---

## Environment Variables Reference

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `ADMIN_PASSWORD` | Password to access the admin dashboard at `/admin` |

---

## Project Structure

```
src/
  app/
    page.tsx                  # Public assessor landing page
    admin/page.tsx            # Admin dashboard (password protected)
    api/admin/auth/route.ts   # Admin password validation endpoint
    assessment/
      new/page.tsx            # New assessment form
      [id]/page.tsx           # Edit/view existing assessment
  components/
    steps/                    # Step1-Step8 form components
    FormFields.tsx            # Reusable form field components
    PhotoUpload.tsx           # Per-category photo upload component
  lib/
    types.ts                  # TypeScript types and constants
    scoring.ts                # Condition score calculation logic
    supabase.ts               # Supabase client setup
supabase-setup.sql            # Run once in Supabase to create all tables
```

---

## Transferring Ownership

To hand this project over, transfer the following:

1. **GitHub repo** — Settings → Danger Zone → Transfer Ownership
2. **Vercel project** — Settings → Transfer Project (or invite new owner as member)
3. **Supabase project** — Settings → Team → Invite member with Owner role
4. **Environment variables** — share the four values listed above securely

The new owner should update `ADMIN_PASSWORD` in Vercel after taking over.
