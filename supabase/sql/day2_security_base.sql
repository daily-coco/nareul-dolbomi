-- =========================================================
-- Day 2: 기본 테이블 생성 + RLS 활성화
-- =========================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------
-- ENUM
-- ---------------------------------------------------------

do $$
begin
  create type public.app_role as enum ('user', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.care_subject_type as enum ('self', 'family', 'pet', 'other');
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------
-- updated_at 자동 갱신 함수
-- ---------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------
-- profiles
-- ---------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint profiles_display_name_length
    check (
      display_name is null
      or char_length(display_name) between 1 and 40
    )
);

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- 회원가입 시 profiles 자동 생성
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, null, 'user')
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- ---------------------------------------------------------
-- care_subjects
-- ---------------------------------------------------------

create table if not exists public.care_subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type public.care_subject_type not null default 'self',
  name text not null,
  birth_date date,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint care_subjects_name_length
    check (char_length(name) between 1 and 60),

  constraint care_subjects_note_length
    check (
      note is null
      or char_length(note) <= 500
    )
);

create index if not exists care_subjects_user_id_idx
on public.care_subjects(user_id);

drop trigger if exists set_care_subjects_updated_at on public.care_subjects;

create trigger set_care_subjects_updated_at
before update on public.care_subjects
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- records
-- ---------------------------------------------------------

create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  care_subject_id uuid references public.care_subjects(id) on delete set null,
  title text,
  content text not null,
  recorded_at timestamptz not null default now(),
  tags text[] not null default '{}',
  has_attachments boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,

  constraint records_title_length
    check (
      title is null
      or char_length(title) <= 100
    ),

  constraint records_content_length
    check (char_length(content) between 1 and 20000),

  constraint records_tags_limit
    check (coalesce(cardinality(tags), 0) <= 20)
);

create index if not exists records_user_id_recorded_at_idx
on public.records(user_id, recorded_at desc);

create index if not exists records_care_subject_id_idx
on public.records(care_subject_id);

drop trigger if exists set_records_updated_at on public.records;

create trigger set_records_updated_at
before update on public.records
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- RLS 활성화
-- ---------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.care_subjects enable row level security;
alter table public.records enable row level security;

alter table public.profiles force row level security;
alter table public.care_subjects force row level security;
alter table public.records force row level security;

grant usage on schema public to authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.care_subjects to authenticated;
grant select, insert, update, delete on public.records to authenticated;

-- ---------------------------------------------------------
-- profiles RLS
-- ---------------------------------------------------------

drop policy if exists "profiles_select_own" on public.profiles;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
);

drop policy if exists "profiles_insert_own_as_user" on public.profiles;

create policy "profiles_insert_own_as_user"
on public.profiles
for insert
to authenticated
with check (
  id = (select auth.uid())
  and role = 'user'
);

-- ---------------------------------------------------------
-- care_subjects RLS
-- ---------------------------------------------------------

drop policy if exists "care_subjects_select_own" on public.care_subjects;

create policy "care_subjects_select_own"
on public.care_subjects
for select
to authenticated
using (
  user_id = (select auth.uid())
);

drop policy if exists "care_subjects_insert_own" on public.care_subjects;

create policy "care_subjects_insert_own"
on public.care_subjects
for insert
to authenticated
with check (
  user_id = (select auth.uid())
);

drop policy if exists "care_subjects_update_own" on public.care_subjects;

create policy "care_subjects_update_own"
on public.care_subjects
for update
to authenticated
using (
  user_id = (select auth.uid())
)
with check (
  user_id = (select auth.uid())
);

drop policy if exists "care_subjects_delete_own" on public.care_subjects;

create policy "care_subjects_delete_own"
on public.care_subjects
for delete
to authenticated
using (
  user_id = (select auth.uid())
);

-- ---------------------------------------------------------
-- records RLS
-- ---------------------------------------------------------

drop policy if exists "records_select_own" on public.records;

create policy "records_select_own"
on public.records
for select
to authenticated
using (
  user_id = (select auth.uid())
);

drop policy if exists "records_insert_own" on public.records;

create policy "records_insert_own"
on public.records
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and (
    care_subject_id is null
    or exists (
      select 1
      from public.care_subjects cs
      where cs.id = care_subject_id
        and cs.user_id = (select auth.uid())
    )
  )
);

drop policy if exists "records_update_own" on public.records;

create policy "records_update_own"
on public.records
for update
to authenticated
using (
  user_id = (select auth.uid())
)
with check (
  user_id = (select auth.uid())
  and (
    care_subject_id is null
    or exists (
      select 1
      from public.care_subjects cs
      where cs.id = care_subject_id
        and cs.user_id = (select auth.uid())
    )
  )
);

drop policy if exists "records_delete_own" on public.records;

create policy "records_delete_own"
on public.records
for delete
to authenticated
using (
  user_id = (select auth.uid())
);