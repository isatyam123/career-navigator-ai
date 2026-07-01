
-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete to authenticated using (auth.uid() = id);

-- APPLICATIONS
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company text not null,
  role text not null,
  job_description text,
  status text not null default 'Applied',
  deadline date,
  notes text,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.applications to authenticated;
grant all on public.applications to service_role;
alter table public.applications enable row level security;
create policy "applications_all_own" on public.applications for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index applications_user_id_idx on public.applications(user_id);

-- RESUME
create table public.resume (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resume_url text,
  skills jsonb not null default '[]'::jsonb,
  education jsonb not null default '[]'::jsonb,
  experience jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.resume to authenticated;
grant all on public.resume to service_role;
alter table public.resume enable row level security;
create policy "resume_all_own" on public.resume for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index resume_user_id_idx on public.resume(user_id);

-- ANALYSIS
create table public.analysis (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  application_id uuid references public.applications(id) on delete cascade,
  match_score numeric,
  ats_score numeric,
  missing_skills jsonb not null default '[]'::jsonb,
  suggestions text,
  generated_email text,
  interview_questions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.analysis to authenticated;
grant all on public.analysis to service_role;
alter table public.analysis enable row level security;
create policy "analysis_all_own" on public.analysis for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index analysis_user_id_idx on public.analysis(user_id);
create index analysis_application_id_idx on public.analysis(application_id);

-- AUTO-CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
