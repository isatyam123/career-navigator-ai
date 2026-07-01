# 🚀 Career Navigator AI

> **An AI-powered career management platform that helps students optimize resumes, track job applications, prepare for interviews, and generate professional emails — all in one place.**

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-yellow)

</p>

---

## 🌐 Live Demo

🔗 **Website:** https://career-navigator-ai-five.vercel.app

🎥 **Demo Video:** https://drive.google.com/file/d/1QkmfMpGjcmoQ3Lwqog_4Wpnmv2hIknAC/view

---

# 📌 Problem Statement

Students often manage their placement journey across multiple disconnected tools:

- Resume optimization
- Job application tracking
- Interview preparation
- Recruiter communication

This results in poor organization, missed opportunities, and inefficient preparation.

**Career Navigator AI** solves this by bringing every stage of the placement journey into a single AI-powered platform.

---

# ✨ Features

## 📄 AI Resume Analyzer

Upload your resume and paste any Job Description.

Google Gemini instantly provides:

- ATS Score
- Resume Match Score
- Strengths
- Weaknesses
- Improvement Suggestions
- Missing Skills

---

## 💼 Job Application Tracker

Manage every application in one place.

Features include:

- Add Applications
- Edit Applications
- Delete Applications
- Search Applications
- Track Progress

Application stages:

- Applied
- Online Assessment
- Interview
- HR
- Offer
- Rejected
- Withdrawn

---

## 🎯 AI Interview Preparation

Generate personalized interview questions based on:

- Resume
- Job Description

Question categories:

- Technical
- Behavioral
- HR

---

## ✉️ AI Email Generator

Generate professional emails in seconds.

Supports:

- Recruiter Outreach
- Follow-up Emails
- Thank You Emails
- Referral Requests

---

## 📊 Dashboard

Real-time analytics including:

- Resume Score
- Total Applications
- Application Status
- AI Analysis History

---

# 🤖 AI Workflow

```text
Resume + Job Description
            │
            ▼
     Google Gemini AI
            │
            ▼
 ┌───────────────────────────┐
 │ ATS Analysis              │
 │ Resume Matching           │
 │ Suggestions               │
 │ Interview Questions       │
 │ Email Generation          │
 └───────────────────────────┘
```

---

# 🏗 Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React 19 |
| Framework | TanStack Start |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Google OAuth (Supabase Auth) |
| Storage | Supabase Storage |
| AI | Google Gemini |
| Deployment | Vercel |

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/career-navigator-ai.git

cd career-navigator-ai
```

---

## Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file by copying `.env.example`.

```bash
cp .env.example .env
```

Configure the following variables:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Client-side Supabase Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Client-side Supabase Publishable (Anon) Key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase Project Reference |
| `SUPABASE_URL` | Server-side Supabase Project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Server-side Supabase Publishable Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Service Role Key (**Keep Secret**) |
| `SUPABASE_PROJECT_ID` | Supabase Project Reference |
| `GEMINI_API_KEY` | Google Gemini API Key |

A ready-to-use template is already provided in `.env.example`.

---

# 🗄 Supabase Setup

1. Create a Supabase Project.
2. Execute the SQL migration inside:

```text
supabase/migrations/
```

3. Enable Google Authentication.

```
Authentication
→ Providers
→ Google
```

4. Create a Storage Bucket named:

```text
resumes
```

5. Configure Row Level Security (RLS).

---

# ▶️ Run Locally

```bash
npm run dev
```

Visit

```
http://localhost:5173
```

---

# 🚀 Deploy on Vercel

1. Push the repository to GitHub.

2. Import the project into Vercel.

3. Configure the environment variables.

4. Deploy.

---

# 📁 Project Structure

```text
src/
 ├── components/
 ├── hooks/
 ├── integrations/
 ├── lib/
 ├── routes/
 ├── server.ts
 └── styles.css

supabase/
 └── migrations/

public/

vite.config.ts
```

---

# 🔮 Future Enhancements

- AI Resume Builder
- Cover Letter Generator
- Company Insights
- Job Recommendation Engine
- Chrome Extension
- AI Mock Interview Agent
- Resume Version Management

---

# 👨‍💻 Author

**Satyam Kumar**
