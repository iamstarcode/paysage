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
--Profile End

CREATE TABLE currencies (
    id bigint generated by default as identity primary key,
    currency_name VARCHAR(50) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,
    currency_sign VARCHAR(1)  NOT NULL,
    UNIQUE(currency_code)
);

CREATE TABLE public.wallets (
    id bigint generated by default as identity primary key,
    user_id uuid references auth.users on delete cascade not null, -- Reference to the user who owns the wallet
    currency_id INT REFERENCES public.currencies(id),
    balance NUMERIC(20, 2) DEFAULT 0, -- Balance of the currency in the wallet
    UNIQUE(user_id, currency_id) -- Ensure each user has only one wallet per currency
);
alter table public.wallets enable row level security;
create policy "Only Users to create new wallet."
    on public.wallets for insert
    to authenticated 
    with check ( auth.uid() = user_id );
create policy "Only Users can view own wallet."
    on public.wallets for select
    to authenticated 
    using ( auth.uid() = user_id );
create policy "Users can update their own wallet balance."
    on wallets for update
    to authenticated                    
    using ( auth.uid() = user_id );
-- Comtemplate for delete permission
create or replace function public.transfer_funds(sender_id text, receiver_id text, amount numeric, _currency_id bigint)
returns void
security definer set search_path = public
as $$
begin
  -- Create a wallet for the receiver if it doesn't exist
  if not exists (select 1 from wallets where user_id = receiver_id::uuid and wallets.currency_id = _currency_id) then
    insert into wallets (user_id, currency_id, balance) values (receiver_id::uuid, _currency_id, 0);
  end if;

  -- Deduct the amount from the sender's balance
  update wallets
  set balance = balance - amount::numeric
  where user_id = sender_id::uuid and wallets.currency_id = _currency_id;

  -- Add the amount to the receiver's balance
  update wallets
  set balance = balance + amount::numeric
  where user_id = receiver_id::uuid and wallets.currency_id = _currency_id;
end;
$$ language plpgsql;

grant execute on function public.transfer_funds(text, text, numeric, bigint) to authenticated;
--End Wallet

CREATE TABLE transactions (
    id bigint generated by default as identity primary key,
    transaction_type VARCHAR(50) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sender_id text,
    receiver_id text,
    amount DECIMAL(18, 6),
    currency VARCHAR(10),
    description TEXT,
    status VARCHAR(20) DEFAULT 'Pending'
);

CREATE TABLE fiat_transfers (
    id bigint references transactions,
    reference_number VARCHAR(50),
);

CREATE TABLE crypto_transfers (
    id bigint references transactions,
    transaction_hash VARCHAR(100),
);

CREATE TABLE bill_payments (
    id bigint references transactions,
    bill_reference_number VARCHAR(50),
);

--End Trans
