# Career Navigator AI

Career Navigator AI is a comprehensive, intelligent job application manager designed for students and professionals. By leveraging advanced AI, this platform transforms the chaotic job hunt into a structured, optimized, and personalized experience.

<div align="center">
  <img src="https://via.placeholder.com/1200x600/18181b/ffffff?text=Career+Navigator+AI+Dashboard" alt="Career Navigator AI Dashboard">
</div>

## ✨ Features

- **Smart Resume Analyzer**: Upload your resume PDF and paste a job description. The AI instantly calculates your ATS compatibility, identifies missing skills, and suggests concrete improvements.
- **AI Interview Prep**: Generate customized technical, behavioral, and HR interview questions tailored to your exact background and the specific role you're targeting.
- **Application Tracker**: Stay organized with a built-in Kanban-style pipeline. Track the status of every application, set deadlines, and attach notes effortlessly.
- **AI Outreach Emails**: Say goodbye to writer's block. Automatically draft polished application and follow-up emails highlighting your strengths and aligning with the job description.
- **Detailed History Logging**: Every resume analysis and interview prep session is saved so you can revisit them without spending additional AI credits.

## 🛠️ Tech Stack

- **Frontend & Framework**: [TanStack Start](https://tanstack.com/start/latest) (React 19 + Vite)
- **Styling**: Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) (Authentication, Postgres DB, Storage)
- **AI Integration**: Vercel AI SDK (`@ai-sdk/google`) powered by Google Gemini (e.g., `gemini-1.5-flash`)
- **PDF Extraction**: `unpdf` (Workers-compatible pdf.js build)

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x450/18181b/ffffff?text=Resume+Analysis+Results" width="49%">
  <img src="https://via.placeholder.com/800x450/18181b/ffffff?text=Application+Tracker+Board" width="49%">
</div>
<div align="center">
  <img src="https://via.placeholder.com/800x450/18181b/ffffff?text=Interview+Prep+Deck" width="49%">
  <img src="https://via.placeholder.com/800x450/18181b/ffffff?text=AI+Email+Generator" width="49%">
</div>

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values. You can find your Supabase credentials in your project dashboard under **Settings → API**.

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-publishable-key>
VITE_SUPABASE_PROJECT_ID=<your-project-ref>

SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=<your-anon-publishable-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>   # Secret! Server only.
SUPABASE_PROJECT_ID=<your-project-ref>

# Set your Google Gemini API key here
GEMINI_API_KEY=<your-gemini-api-key>
```

### 3. Setup Supabase Auth (Google Sign-in)

The app relies on native Supabase Google OAuth for authentication.

1. In the **Google Cloud Console**, create an OAuth Web Application credential.
2. Add `https://<your-project-ref>.supabase.co/auth/v1/callback` as an Authorized Redirect URI.
3. In your **Supabase Dashboard** (Authentication → Providers), enable **Google** and paste your Client ID and Secret.
4. In Supabase (Authentication → URL Configuration), add `http://localhost:3000/auth/callback` to your Redirect URLs.

### 4. Run the Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🌍 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the project into Vercel. There's no need for a framework preset, as the included `vercel.json` and build scripts automatically configure TanStack Start for Vercel using Nitro.
3. Add all your environment variables from `.env` into your Vercel Project Settings.
4. Update your Supabase URL Configuration to include your new Vercel domain (e.g., `https://<your-vercel-domain>/auth/callback`).
5. Deploy and enjoy!

## 📄 License

This project is open-source and available under the MIT License.
