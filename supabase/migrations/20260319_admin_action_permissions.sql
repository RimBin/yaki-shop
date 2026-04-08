alter table public.user_profiles
  add column if not exists admin_permissions jsonb not null default '{}'::jsonb;

comment on column public.user_profiles.admin_permissions is
  'Per-section admin permission levels for manager accounts. Supported values per section are view or manage.';

create index if not exists user_profiles_admin_permissions_idx
  on public.user_profiles using gin (admin_permissions);

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

  if new.admin_permissions is null then
    new.admin_permissions := '{}'::jsonb;
  end if;

  if tg_op = 'INSERT' then
    if coalesce(new.role, 'user') <> 'user' and not can_manage_user_privileges() then
      raise exception 'Only admins can assign privileged roles';
    end if;

    if coalesce(array_length(new.admin_sections, 1), 0) > 0 and not can_manage_user_privileges() then
      raise exception 'Only admins can assign admin sections';
    end if;

    if new.admin_permissions <> '{}'::jsonb and not can_manage_user_privileges() then
      raise exception 'Only admins can assign admin permissions';
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

  if coalesce(new.admin_permissions, '{}'::jsonb) is distinct from coalesce(old.admin_permissions, '{}'::jsonb)
    and not can_manage_user_privileges() then
    raise exception 'Only admins can change admin permissions';
  end if;

  return new;
end;
$$;

drop trigger if exists user_profiles_enforce_admin_fields_change_admin_only on public.user_profiles;

create trigger user_profiles_enforce_admin_fields_change_admin_only
  before insert or update of role, admin_sections, admin_permissions on public.user_profiles
  for each row
  execute function public.user_profiles_enforce_admin_fields_change_admin_only();