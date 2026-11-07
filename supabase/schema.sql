-- Run in Supabase SQL Editor after creating a free project.
-- This schema stores student profiles and attempts. RLS ensures users see only their own records.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);
create table if not exists public.attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  chapter smallint not null check (chapter between 1 and 11),
  is_correct boolean not null,
  answered_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.attempts enable row level security;
create policy "read own profile" on public.profiles for select using (auth.uid() = id);
create policy "insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "read own attempts" on public.attempts for select using (auth.uid() = user_id);
create policy "insert own attempts" on public.attempts for insert with check (auth.uid() = user_id);
-- No public admin policy is created. Admin functions must use trusted server-side authorization.
