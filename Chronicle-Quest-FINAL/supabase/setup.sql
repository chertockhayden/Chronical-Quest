create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  display_name text not null,
  points integer not null default 0,
  coins integer not null default 100,
  streak integer not null default 1,
  unlocked_upgrades text[] not null default '{}',
  completed_games jsonb not null default '{}'::jsonb,
  avatar_color text not null default '#f97316',
  role text not null default 'student',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  unit_id text not null,
  tags text[] not null default '{}',
  is_approved boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'role'
  ) then
    alter table public.profiles add column role text not null default 'student';
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'questions'
      and column_name = 'is_approved'
  ) then
    alter table public.questions add column is_approved boolean not null default false;
    update public.questions set is_approved = true;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'answers'
      and column_name = 'is_approved'
  ) then
    alter table public.answers add column is_approved boolean not null default false;
    update public.answers set is_approved = true;
  end if;
end $$;

create unique index if not exists profiles_username_lower_idx on public.profiles (lower(username));
create index if not exists questions_user_id_idx on public.questions (user_id);
create index if not exists questions_created_at_idx on public.questions (created_at desc);
create index if not exists questions_approved_idx on public.questions (is_approved);
create index if not exists answers_question_id_idx on public.answers (question_id);
create index if not exists answers_user_id_idx on public.answers (user_id);
create index if not exists answers_approved_idx on public.answers (is_approved);

alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.answers enable row level security;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('teacher', 'moderator')
  );
$$;

drop policy if exists "profiles_read_all" on public.profiles;
create policy "profiles_read_all"
on public.profiles
for select
to anon, authenticated
using (true);

drop policy if exists "questions_read_visible" on public.questions;
create policy "questions_read_visible"
on public.questions
for select
to anon, authenticated
using (
  is_approved = true
  or auth.uid() = user_id
  or public.is_staff()
);

drop policy if exists "answers_read_visible" on public.answers;
create policy "answers_read_visible"
on public.answers
for select
to anon, authenticated
using (
  is_approved = true
  or auth.uid() = user_id
  or public.is_staff()
);

create or replace function public.create_profile(
  p_username text,
  p_display_name text,
  p_avatar_color text default '#f97316'
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_profile public.profiles;
  v_username text := lower(regexp_replace(trim(coalesce(p_username, '')), '[^a-z0-9_]', '', 'g'));
  v_display_name text := trim(coalesce(p_display_name, ''));
begin
  if v_uid is null then
    raise exception 'You must be signed in.';
  end if;

  if length(v_username) < 3 then
    raise exception 'Username must be at least 3 characters.';
  end if;

  if length(v_display_name) < 2 then
    raise exception 'Display name must be at least 2 characters.';
  end if;

  insert into public.profiles (id, username, display_name, avatar_color)
  values (v_uid, v_username, left(v_display_name, 32), coalesce(nullif(trim(p_avatar_color), ''), '#f97316'))
  on conflict (id) do update
  set username = excluded.username,
      display_name = excluded.display_name,
      avatar_color = excluded.avatar_color
  returning * into v_profile;

  return v_profile;
end;
$$;

create or replace function public.create_question(
  p_title text,
  p_body text,
  p_unit_id text,
  p_tags text[] default '{}'
)
returns public.questions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_question public.questions;
  v_is_staff boolean := public.is_staff();
begin
  if v_uid is null then
    raise exception 'You must be signed in.';
  end if;

  if length(trim(coalesce(p_title, ''))) < 5 then
    raise exception 'Question titles must be at least 5 characters.';
  end if;

  if length(trim(coalesce(p_body, ''))) < 10 then
    raise exception 'Question details must be at least 10 characters.';
  end if;

  insert into public.questions (user_id, title, body, unit_id, tags, is_approved)
  values (
    v_uid,
    left(trim(p_title), 120),
    left(trim(p_body), 1500),
    coalesce(nullif(trim(p_unit_id), ''), 'unit1'),
    coalesce(p_tags, '{}'),
    v_is_staff
  )
  returning * into v_question;

  update public.profiles
  set points = points + 25,
      coins = coins + 12
  where id = v_uid;

  return v_question;
end;
$$;

create or replace function public.create_answer(
  p_question_id uuid,
  p_body text
)
returns public.answers
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_answer public.answers;
  v_is_staff boolean := public.is_staff();
begin
  if v_uid is null then
    raise exception 'You must be signed in.';
  end if;

  if length(trim(coalesce(p_body, ''))) < 5 then
    raise exception 'Answers must be at least 5 characters.';
  end if;

  insert into public.answers (question_id, user_id, body, is_approved)
  values (p_question_id, v_uid, left(trim(p_body), 1500), v_is_staff)
  returning * into v_answer;

  update public.profiles
  set points = points + 35,
      coins = coins + 16
  where id = v_uid;

  return v_answer;
end;
$$;

create or replace function public.submit_game_result(
  p_game_id text,
  p_score integer
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_profile public.profiles;
  v_score integer := greatest(0, least(coalesce(p_score, 0), 100));
  v_base_points integer := 20;
  v_base_coins integer := 10;
  v_reward_points integer;
  v_reward_coins integer;
  v_best integer := 0;
  v_improvement_bonus integer := 0;
begin
  if v_uid is null then
    raise exception 'You must be signed in.';
  end if;

  if p_game_id = 'timeline' then
    v_base_points := 35;
    v_base_coins := 18;
  elsif p_game_id = 'rapid' then
    v_base_points := 45;
    v_base_coins := 24;
  elsif p_game_id = 'connections' then
    v_base_points := 40;
    v_base_coins := 20;
  elsif p_game_id = 'debate' then
    v_base_points := 50;
    v_base_coins := 28;
  end if;

  select *
  into v_profile
  from public.profiles
  where id = v_uid
  for update;

  if v_profile is null then
    raise exception 'Profile not found.';
  end if;

  v_best := coalesce((v_profile.completed_games ->> p_game_id)::integer, 0);
  if v_score > v_best then
    v_improvement_bonus := 20;
  end if;

  v_reward_points := round(v_base_points + (v_score * 1.6))::integer;
  v_reward_coins := round(v_base_coins + (v_score * 0.7))::integer;

  update public.profiles
  set points = points + v_reward_points + v_improvement_bonus,
      coins = coins + v_reward_coins + round(v_improvement_bonus / 2.0)::integer,
      completed_games = coalesce(completed_games, '{}'::jsonb) || jsonb_build_object(p_game_id, greatest(v_score, v_best))
  where id = v_uid
  returning * into v_profile;

  return v_profile;
end;
$$;

create or replace function public.purchase_upgrade(
  p_upgrade_id text
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_profile public.profiles;
  v_cost integer;
begin
  if v_uid is null then
    raise exception 'You must be signed in.';
  end if;

  v_cost := case p_upgrade_id
    when 'memory-atlas' then 120
    when 'debate-studio' then 180
    when 'source-lens' then 240
    when 'streak-shield' then 320
    else null
  end;

  if v_cost is null then
    raise exception 'Upgrade not found.';
  end if;

  select *
  into v_profile
  from public.profiles
  where id = v_uid
  for update;

  if v_profile is null then
    raise exception 'Profile not found.';
  end if;

  if p_upgrade_id = any(v_profile.unlocked_upgrades) then
    raise exception 'You already own that upgrade.';
  end if;

  if v_profile.coins < v_cost then
    raise exception 'Not enough coins yet.';
  end if;

  update public.profiles
  set coins = coins - v_cost,
      unlocked_upgrades = array_append(unlocked_upgrades, p_upgrade_id)
  where id = v_uid
  returning * into v_profile;

  return v_profile;
end;
$$;

create or replace function public.moderate_question(
  p_question_id uuid,
  p_is_approved boolean
)
returns public.questions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_question public.questions;
begin
  if not public.is_staff() then
    raise exception 'Only moderators and teachers can review questions.';
  end if;

  update public.questions
  set is_approved = p_is_approved
  where id = p_question_id
  returning * into v_question;

  return v_question;
end;
$$;

create or replace function public.moderate_answer(
  p_answer_id uuid,
  p_is_approved boolean
)
returns public.answers
language plpgsql
security definer
set search_path = public
as $$
declare
  v_answer public.answers;
begin
  if not public.is_staff() then
    raise exception 'Only moderators and teachers can review answers.';
  end if;

  update public.answers
  set is_approved = p_is_approved
  where id = p_answer_id
  returning * into v_answer;

  return v_answer;
end;
$$;

grant execute on function public.is_staff() to anon, authenticated;
grant execute on function public.create_profile(text, text, text) to authenticated;
grant execute on function public.create_question(text, text, text, text[]) to authenticated;
grant execute on function public.create_answer(uuid, text) to authenticated;
grant execute on function public.submit_game_result(text, integer) to authenticated;
grant execute on function public.purchase_upgrade(text) to authenticated;
grant execute on function public.moderate_question(uuid, boolean) to authenticated;
grant execute on function public.moderate_answer(uuid, boolean) to authenticated;
