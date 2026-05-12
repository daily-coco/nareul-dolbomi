-- supabase/sql/day4_records_security.sql

-- Day 4: records 기본 구조 + RLS 보강
-- 목표:
-- 1. records가 care_subjects와 연결되도록 구성
-- 2. 본인 records만 조회/작성/수정/삭제 가능
-- 3. records.care_subject_id가 본인 care_subjects.id인지 DB에서 검증

create extension if not exists "pgcrypto";

create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  care_subject_id uuid not null references public.care_subjects(id) on delete restrict,
  title text not null,
  content text not null,
  record_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 이미 records 테이블이 있었던 경우를 대비한 컬럼 보강
alter table public.records
  add column if not exists user_id uuid,
  add column if not exists care_subject_id uuid,
  add column if not exists title text,
  add column if not exists content text,
  add column if not exists record_date date,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

-- 기본값 보강
alter table public.records
  alter column id set default gen_random_uuid(),
  alter column user_id set default auth.uid(),
  alter column title set default '',
  alter column content set default '',
  alter column record_date set default current_date,
  alter column created_at set default now(),
  alter column updated_at set default now();

-- 비어 있는 문자열/날짜 기본 보정
update public.records
set title = ''
where title is null;

update public.records
set content = ''
where content is null;

update public.records
set record_date = current_date
where record_date is null;

update public.records
set created_at = now()
where created_at is null;

update public.records
set updated_at = now()
where updated_at is null;

-- title/content/date/timestamps는 not null로 고정
alter table public.records
  alter column title set not null,
  alter column content set not null,
  alter column record_date set not null,
  alter column created_at set not null,
  alter column updated_at set not null;

-- user_id, care_subject_id는 null row가 없을 때만 not null 적용
do $$
begin
  if not exists (
    select 1 from public.records where user_id is null
  ) then
    alter table public.records alter column user_id set not null;
  else
    raise notice 'records.user_id has null rows. Fill them before setting NOT NULL.';
  end if;

  if not exists (
    select 1 from public.records where care_subject_id is null
  ) then
    alter table public.records alter column care_subject_id set not null;
  else
    raise notice 'records.care_subject_id has null rows. Fill them before setting NOT NULL.';
  end if;
end $$;

-- FK 제약 조건 보강
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'records_user_id_fkey'
  ) then
    alter table public.records
      add constraint records_user_id_fkey
      foreign key (user_id)
      references auth.users(id)
      on delete cascade;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'records_care_subject_id_fkey'
  ) then
    alter table public.records
      add constraint records_care_subject_id_fkey
      foreign key (care_subject_id)
      references public.care_subjects(id)
      on delete restrict;
  end if;
end $$;

-- updated_at 자동 갱신 함수
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_records_updated_at on public.records;

create trigger set_records_updated_at
before update on public.records
for each row
execute function public.set_updated_at();

-- 조회/정렬 성능용 인덱스
create index if not exists records_user_id_record_date_idx
on public.records (user_id, record_date desc);

create index if not exists records_user_id_created_at_idx
on public.records (user_id, created_at desc);

create index if not exists records_care_subject_id_idx
on public.records (care_subject_id);

-- RLS 활성화
alter table public.records enable row level security;

-- 기존 정책 정리
drop policy if exists "records_select_own" on public.records;
drop policy if exists "records_insert_own_subject" on public.records;
drop policy if exists "records_update_own_subject" on public.records;
drop policy if exists "records_delete_own" on public.records;

-- 본인 records만 조회
create policy "records_select_own"
on public.records
for select
to authenticated
using (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.care_subjects cs
    where cs.id = records.care_subject_id
      and cs.user_id = (select auth.uid())
  )
);

-- 본인 records만 작성 + care_subject_id도 본인 소유여야 함
create policy "records_insert_own_subject"
on public.records
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.care_subjects cs
    where cs.id = records.care_subject_id
      and cs.user_id = (select auth.uid())
  )
);

-- 본인 records만 수정 + 수정 후 care_subject_id도 본인 소유여야 함
create policy "records_update_own_subject"
on public.records
for update
to authenticated
using (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.care_subjects cs
    where cs.id = records.care_subject_id
      and cs.user_id = (select auth.uid())
  )
)
with check (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.care_subjects cs
    where cs.id = records.care_subject_id
      and cs.user_id = (select auth.uid())
  )
);

-- 본인 records만 삭제
create policy "records_delete_own"
on public.records
for delete
to authenticated
using (
  user_id = (select auth.uid())
);

grant select, insert, update, delete on public.records to authenticated;