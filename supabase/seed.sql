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
/* create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
 */
CREATE TABLE public.currencies (
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
    on public.wallets for update
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

CREATE TYPE transaction_type AS ENUM (
  'fiat',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

CREATE TABLE public.transactions (
    id bigint generated by default as identity primary key,
    transaction_type transaction_type NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actor uuid not null references auth.users,
    party text default null,
    amount DECIMAL(18, 6),
    currency VARCHAR(10),
    description TEXT,
    status VARCHAR(20) DEFAULT 'Pending'
);
-- currency, should probably become currency_id
alter table public.transactions enable row level security;

create policy "Only auth Users to create new trx."
    on public.transactions for insert
    to authenticated 
    with check ( 
        CASE
            WHEN party IS NULL THEN auth.uid() = actor
            ELSE auth.uid() = actor OR auth.uid()::text = party
        END
    );
create policy "Only auth Users can view own trx."
    on public.transactions for select
    to authenticated 
    using ( 
        CASE
            WHEN party IS NULL THEN auth.uid() = actor
            ELSE auth.uid() = actor OR auth.uid()::text = party
        END
    );
create policy "Users can update their own trx."
    on public.transactions for update
    to authenticated                    
    using ( 
        CASE
            WHEN party IS NULL THEN auth.uid() = actor
            ELSE auth.uid() = actor OR auth.uid()::text = party
        END
    );

CREATE TABLE public.fiat_transfers (
    id bigint references transactions,
    amount DECIMAL(18, 6),
    full_name text,
    sender_id uuid,
    receiver_id uuid,
    reference_number VARCHAR(50)
);
CREATE INDEX idx_fiat_transfers_reference_number ON public.fiat_transfers(reference_number);
alter table public.fiat_transfers enable row level security;
create policy "Only Users to create new fiat."
    on public.fiat_transfers for insert
    to authenticated 
    with check ( auth.uid() = sender_id OR auth.uid() = receiver_id );
create policy "Only Users can view own fiat."
    on public.fiat_transfers for select
    to authenticated 
    using ( auth.uid() = sender_id OR auth.uid() = receiver_id );
create policy "Users can update their own wallet fiat."
    on public.fiat_transfers for update
    to authenticated                    
    using ( auth.uid() = sender_id OR auth.uid() = receiver_id );

CREATE TABLE public.crypto_transfers (
    id bigint references transactions,
    transaction_hash VARCHAR(100)
);

/* CREATE TABLE public.bill_payments (
    id bigint references transactions,
    bill_reference_number VARCHAR(50)
);
 */
