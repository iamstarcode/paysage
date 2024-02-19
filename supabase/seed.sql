CREATE TABLE public.profiles (
    id uuid not null references auth.users on delete cascade,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),

    primary key (id)
);

-- CREATE INDEX idx_profile_user_id ON public.profiles(user_id);

alter table public.profiles enable row level security;
create policy "Public profiles are viewable only by authenticated users"
    on public.profiles for select
    to authenticated
    using ( true );

create policy "Users can update own profile."
    on public.profiles for update
    using ( auth.uid() = id );

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);

  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

CREATE TABLE public.wallets (
    id uuid not null references auth.users on delete cascade, -- Reference to the user who owns the wallet
    currency_code VARCHAR(3) NOT NULL, -- Currency code (e.g., USD, EUR, BTC)
    balance NUMERIC(20, 2) DEFAULT 0, -- Balance of the currency in the wallet
    UNIQUE(id, currency_code), -- Ensure each user has only one wallet per currency

    primary key (id)
);

alter table public.wallets enable row level security;

create policy "Only Users can view own wallet."
    on public.wallets for select
    to authenticated
    using ( auth.uid() = id );

