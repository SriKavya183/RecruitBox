-- RecruitBox schema, RLS, storage, and demo seed
-- Paste this into the Supabase SQL Editor and run once.

create extension if not exists pgcrypto;

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  location text not null,
  experience_min int not null default 0,
  description text not null,
  is_open boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  job_id uuid not null references public.jobs(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  experience_years int not null default 0,
  location text not null,
  cover_note text,
  resume_path text not null,
  status text not null default 'applied'
    check (status in ('applied', 'under_review', 'shortlisted', 'interview', 'selected', 'rejected')),
  resume_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_job_id_idx on public.applications (job_id);
create index if not exists applications_status_idx on public.applications (status);
create index if not exists applications_public_id_idx on public.applications (public_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at
before update on public.applications
for each row execute procedure public.set_updated_at();

-- Candidate tracking without exposing the full table
create or replace function public.get_application_by_public_id(p_id text)
returns table (
  public_id text,
  full_name text,
  status text,
  created_at timestamptz,
  job_title text
)
language sql
security definer
set search_path = public
as $$
  select a.public_id, a.full_name, a.status, a.created_at, j.title as job_title
  from public.applications a
  join public.jobs j on j.id = a.job_id
  where a.public_id = upper(trim(p_id))
  limit 1;
$$;

grant execute on function public.get_application_by_public_id(text) to anon, authenticated;

alter table public.jobs enable row level security;
alter table public.applications enable row level security;

drop policy if exists "jobs_public_read" on public.jobs;
create policy "jobs_public_read"
on public.jobs for select
to anon, authenticated
using (true);

drop policy if exists "applications_public_insert" on public.applications;
create policy "applications_public_insert"
on public.applications for insert
to anon, authenticated
with check (true);

drop policy if exists "applications_recruiter_select" on public.applications;
create policy "applications_recruiter_select"
on public.applications for select
to authenticated
using (true);

drop policy if exists "applications_recruiter_update" on public.applications;
create policy "applications_recruiter_update"
on public.applications for update
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

drop policy if exists "resumes_public_upload" on storage.objects;
create policy "resumes_public_upload"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'resumes');

drop policy if exists "resumes_recruiter_read" on storage.objects;
create policy "resumes_recruiter_read"
on storage.objects for select
to authenticated
using (bucket_id = 'resumes');

-- Seed jobs (idempotent by title)
insert into public.jobs (title, department, location, experience_min, description)
select * from (values
  (
    'Frontend Engineer',
    'Engineering',
    'Bengaluru',
    2,
    'Build candidate and recruiter UIs in React. You will own job listing, application, and dashboard screens, work with Tailwind, and ship accessible, fast interfaces.'
  ),
  (
    'Backend Engineer',
    'Engineering',
    'Hyderabad',
    3,
    'Design APIs, Postgres schemas, and integrations. Experience with authentication, file storage, and reliable data models is a plus.'
  ),
  (
    'Product Designer',
    'Design',
    'Remote',
    2,
    'Shape the RecruitBox MVP: hiring workflows, empty states, and a clean recruiter dashboard. Portfolio of B2B SaaS work preferred.'
  ),
  (
    'Talent Partner',
    'People',
    'Mumbai',
    4,
    'Run full-cycle hiring for engineering roles. You will screen applications, schedule interviews, and keep candidates moving through the pipeline.'
  ),
  (
    'Data Analyst',
    'Analytics',
    'Pune',
    1,
    'Turn hiring data into insight. SQL comfort required. You will help recruiters understand funnel conversion and time-to-hire.'
  )
) as v(title, department, location, experience_min, description)
where not exists (select 1 from public.jobs j where j.title = v.title);

-- Seed applications for a non-empty recruiter dashboard
insert into public.applications (
  public_id, job_id, full_name, email, phone, experience_years, location, cover_note, resume_path, status, resume_summary
)
select s.public_id, j.id, s.full_name, s.email, s.phone, s.experience_years, s.location, s.cover_note, s.resume_path, s.status, s.resume_summary
from (values
  ('RB-DEMO01', 'Frontend Engineer', 'Aisha Khan', 'aisha.khan@example.com', '9876500001', 4, 'Bengaluru', 'Shipped three React design systems.', 'seed/aisha.pdf', 'applied', null),
  ('RB-DEMO02', 'Frontend Engineer', 'Rohan Mehta', 'rohan.mehta@example.com', '9876500002', 6, 'Bengaluru', 'Strong TypeScript and Vite experience.', 'seed/rohan.pdf', 'under_review', null),
  ('RB-DEMO03', 'Backend Engineer', 'Priya Nair', 'priya.nair@example.com', '9876500003', 5, 'Hyderabad', 'Postgres and API design focused.', 'seed/priya.pdf', 'shortlisted', 'Experienced backend engineer comfortable with Postgres and auth. Strong fit for API ownership. Recommendation: proceed to interview.'),
  ('RB-DEMO04', 'Backend Engineer', 'Arjun Patel', 'arjun.patel@example.com', '9876500004', 2, 'Pune', 'Looking to grow into backend.', 'seed/arjun.pdf', 'rejected', null),
  ('RB-DEMO05', 'Product Designer', 'Maya Bose', 'maya.bose@example.com', '9876500005', 3, 'Remote', 'Hiring-product case studies available.', 'seed/maya.pdf', 'interview', null),
  ('RB-DEMO06', 'Talent Partner', 'Dev Sharma', 'dev.sharma@example.com', '9876500006', 8, 'Mumbai', 'Scaled campus and lateral hiring.', 'seed/dev.pdf', 'selected', null),
  ('RB-DEMO07', 'Data Analyst', 'Neha Gupta', 'neha.gupta@example.com', '9876500007', 1, 'Pune', 'SQL and dashboarding.', 'seed/neha.pdf', 'applied', null),
  ('RB-DEMO08', 'Frontend Engineer', 'Kabir Singh', 'kabir.singh@example.com', '9876500008', 3, 'Delhi', 'Built internal recruiting tools.', 'seed/kabir.pdf', 'shortlisted', null),
  ('RB-DEMO09', 'Product Designer', 'Leela Iyer', 'leela.iyer@example.com', '9876500009', 5, 'Chennai', 'End-to-end product design.', 'seed/leela.pdf', 'under_review', null),
  ('RB-DEMO10', 'Talent Partner', 'Samira Ali', 'samira.ali@example.com', '9876500010', 4, 'Mumbai', 'High-volume engineering hiring.', 'seed/samira.pdf', 'interview', null)
) as s(public_id, job_title, full_name, email, phone, experience_years, location, cover_note, resume_path, status, resume_summary)
join public.jobs j on j.title = s.job_title
where not exists (select 1 from public.applications a where a.public_id = s.public_id);
