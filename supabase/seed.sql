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


CREATE TABLE currencies (
    id bigint generated by default as identity primary key,
    currency_name VARCHAR(50) NOT NULL,
    currency_code VARCHAR(10) NOT NULL,
    UNIQUE(currency_code)
);


CREATE TABLE public.wallets (
    id bigint generated by default as identity primary key,
    user_id uuid references auth.users on delete cascade not null, -- Reference to the user who owns the wallet
    currency_id INT REFERENCES public.currencies(id),
    balance NUMERIC(20, 2) DEFAULT 0, -- Balance of the currency in the wallet
    UNIQUE(id, currency_id) -- Ensure each user has only one wallet per currency
);

alter table public.wallets enable row level security;

create policy "Only Users can view own wallet."
    on public.wallets for select
    to authenticated
    using ( auth.uid() = user_id );


CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  sender_wallet_id INTEGER REFERENCES public.wallets(id),
  receiver_wallet_id INTEGER REFERENCES public.wallets(id),
  amount NUMERIC(18, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);



