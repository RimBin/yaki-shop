drop policy if exists "Users can insert their own profile" on user_profiles;

create policy "Users can insert their own profile"
  on user_profiles for insert
  with check (auth.uid() = id);