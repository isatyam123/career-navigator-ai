# Career Navigator AI

Career Navigator AI is an intelligent job application manager tailored for students and early-career professionals. It leverages Google Gemini AI to analyze resumes against job descriptions, track application statuses, and provide tailored interview preparation.

## Features

- **AI Resume Analyzer**: Upload your resume and paste a job description to receive an instant ATS score, match percentage, and actionable feedback.
- **Application Tracking**: Keep all your job applications organized in one place with a Kanban-style pipeline (Applied, OA, Interview, HR, Offer, Rejected, Withdrawn).
- **Interview Prep**: Generate targeted technical, behavioral, and HR questions based on your resume and the specific role.
- **Email Generator**: Draft professional follow-ups, recruiter outreaches, and application emails with one click.
- **Dashboard Analytics**: Get a bird's-eye view of your application conversion rates and overall progress.

## Tech Stack

- **Framework**: TanStack Start (React 19)
- **Styling**: Tailwind CSS, Shadcn UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Google OAuth & Email/Password)
- **AI Integration**: Google Gemini via Vercel AI SDK
- **File Storage**: Supabase Storage
- **Deployment**: Vercel

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/career-navigator-ai.git
cd career-navigator-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Copy the `.env.example` file to `.env` and fill in your values:
```bash
cp .env.example .env
```
Ensure you provide your Supabase URL, Anon Key, and Google Gemini API Key.

### 4. Supabase Setup
You need a Supabase project. The initial database schema is located in `supabase/migrations/00000000000000_initial_schema.sql`.

1. Go to your Supabase project dashboard.
2. Navigate to the SQL Editor.
3. Paste the contents of `00000000000000_initial_schema.sql` and execute it.
4. Set up an authentication provider (Google OAuth is recommended) in Authentication -> Providers.
5. Set up a Storage bucket named `resumes` and ensure the RLS policies allow authenticated users to upload files.

### 5. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Vercel Deployment

The application is configured to be deployed easily on Vercel.

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Add the required environment variables from your `.env` file to the Vercel project settings.
4. Deploy!

## Folder Structure

```text
├── src/
│   ├── components/       # Reusable React components (UI library)
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # Third-party integrations (Supabase Client, Types)
│   ├── lib/              # Utility functions and server operations
│   ├── routes/           # TanStack Start file-based routing
│   ├── server.ts         # Server entry point
│   └── styles.css        # Global CSS and Tailwind directives
├── supabase/
│   └── migrations/       # Database SQL migrations
├── public/               # Static assets
└── vite.config.ts        # Vite configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
