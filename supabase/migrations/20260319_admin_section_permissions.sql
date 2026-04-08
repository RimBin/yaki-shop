alter table public.user_profiles
  add column if not exists admin_sections text[] not null default '{}'::text[];

comment on column public.user_profiles.role is
  'User role in storefront and admin access model. Supported roles include user, manager, and admin.';

comment on column public.user_profiles.admin_sections is
  'Admin areas visible and accessible to manager accounts. Admin accounts always have full access.';

create index if not exists user_profiles_admin_sections_idx
  on public.user_profiles using gin (admin_sections);

create or replace function public.can_manage_user_privileges()
returns boolean
language plpgsql
stable
security definer
set search_path = public, auth, pg_catalog
as $$
begin
  return coalesce(auth.jwt()->>'role', '') = 'service_role' or is_admin();
end;
$$;

comment on function public.can_manage_user_privileges() is
  'Allows admin privilege mutations for email-whitelisted admins and service-role API flows.';

create or replace function public.user_profiles_enforce_admin_fields_change_admin_only()
returns trigger
language plpgsql
security definer
set search_path = public, auth, pg_catalog
as $$
begin
  if new.admin_sections is null then
    new.admin_sections := '{}'::text[];
  end if;

  if tg_op = 'INSERT' then
    if coalesce(new.role, 'user') <> 'user' and not can_manage_user_privileges() then
      raise exception 'Only admins can assign privileged roles';
    end if;

    if coalesce(array_length(new.admin_sections, 1), 0) > 0 and not can_manage_user_privileges() then
      raise exception 'Only admins can assign admin sections';
    end if;

    return new;
  end if;

  if new.role is distinct from old.role and not can_manage_user_privileges() then
    raise exception 'Only admins can change user roles';
  end if;

  if coalesce(new.admin_sections, '{}'::text[]) is distinct from coalesce(old.admin_sections, '{}'::text[])
    and not can_manage_user_privileges() then
    raise exception 'Only admins can change admin sections';
  end if;

  return new;
end;
$$;

drop trigger if exists user_profiles_enforce_role_change_admin_only on public.user_profiles;
drop trigger if exists user_profiles_enforce_admin_fields_change_admin_only on public.user_profiles;

create trigger user_profiles_enforce_admin_fields_change_admin_only
  before insert or update of role, admin_sections on public.user_profiles
  for each row
  execute function public.user_profiles_enforce_admin_fields_change_admin_only();