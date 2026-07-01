
ALTER TABLE public.resume ADD COLUMN IF NOT EXISTS resume_text TEXT;
ALTER TABLE public.resume ADD COLUMN IF NOT EXISTS file_path TEXT;

ALTER TABLE public.analysis ADD COLUMN IF NOT EXISTS important_keywords JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.analysis ADD COLUMN IF NOT EXISTS resume_improvements JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.analysis ADD COLUMN IF NOT EXISTS strengths JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.analysis ADD COLUMN IF NOT EXISTS weaknesses JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.analysis ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE public.analysis ADD COLUMN IF NOT EXISTS job_description TEXT;
