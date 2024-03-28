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


CREATE TYPE currency_type AS ENUM (
  'crypto',
  'fiat'
);

CREATE TABLE public.currencies (
    id bigint generated by default as identity primary key,
    currency_name VARCHAR(50) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,
    currency_sign VARCHAR(1)  NOT NULL,
    currency_type currency_type NOT NULL,
    UNIQUE(currency_code)
);

CREATE TABLE public.wallets (
    id bigint generated by default as identity primary key,
    user_id uuid references auth.users on delete cascade not null, -- Reference to the user who owns the wallet
    balance NUMERIC(20, 8) DEFAULT 0, -- Balance of the currency in the wallet
    currency VARCHAR(3),
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

CREATE TABLE public.deposit_addresses(
    id bigint generated by default as identity primary key,
    user_id uuid references auth.users on delete cascade not null,
    currency VARCHAR(3),
    address  VARCHAR(200)
);
alter table public.deposit_addresses enable row level security;
create policy "Only Users can create deposit address."
    on public.deposit_addresses for insert
    to authenticated 
    with check ( auth.uid() = user_id );
create policy "Only Users can view own deposit address."
    on public.deposit_addresses for select
    to authenticated 
    using ( auth.uid() = user_id );
create policy "Users can update their own deposit address.."
    on public.deposit_addresses for update
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
  'airtime',
  'crypto'
);

CREATE TYPE transaction_status AS ENUM (
  'processing',
  'confirmed',
  'fialed'
);

CREATE TABLE public.transactions (
    id bigint generated by default as identity primary key,
    transaction_type transaction_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(18, 6),
    sender_id uuid references auth.users,
    receiver_id uuid references auth.users,
    currency VARCHAR(10),
    sender_description VARCHAR(255),
    receiver_description VARCHAR(255),
    transaction_status transaction_status NOT NULL
);
alter table public.transactions enable row level security;
create policy "Only auth Users to create new txn."
    on public.transactions for insert
    to authenticated 
    with check ( auth.uid() = sender_id OR auth.uid() = receiver_id );
create policy "Only auth Users can view own txn."
    on public.transactions for select
    to authenticated 
    using ( auth.uid() = sender_id OR auth.uid() = receiver_id );
create policy "Users can update their own txn."
    on public.transactions for update
    to authenticated                    
    using ( auth.uid() = sender_id OR auth.uid() = receiver_id );


CREATE TABLE public.crypto_transactions (
    id bigint generated by default as identity primary key references transactions on delete cascade,
    user_id uuid references auth.users NOT NULL,
    foreign_transaction_id bigint NOT NULL,
    UNIQUE(foreign_transaction_id)
);

CREATE TABLE public.fiat_transactions (
    id bigint references transactions NOT NULL,
    user_id uuid references auth.users NOT NULL,
    amount DECIMAL(18, 6),
    sender_name VARCHAR(100),
    receiver_name VARCHAR(100),
    sender_account VARCHAR(50),
    receiver_account VARCHAR(50),
    _provider VARCHAR(100),
    transaction_id VARCHAR(50)
);
CREATE INDEX idx_fiat_transactions_reference_number ON public.fiat_transactions(transaction_id);

alter table public.fiat_transactions enable row level security;
create policy "Only Users to create new fiat."
    on public.fiat_transactions for insert
    to authenticated 
    with check ( 
        EXISTS (SELECT 1 FROM profiles p WHERE p.id = user_id)
        OR auth.uid() = user_id
    );
create policy "Only Users can view own fiat."
    on public.fiat_transactions for select
    to authenticated 
    using (  auth.uid() = user_id );
create policy "Users can update their own wallet fiat."
    on public.fiat_transactions for update
    to authenticated                    
    using (  auth.uid() = user_id );


/* CREATE TABLE public.bill_payments (
    id bigint references transactions,
    bill_reference_number VARCHAR(50)
);
 */

 -- Functions
CREATE OR REPLACE FUNCTION upsert_wallet_balance(
    IN p_user_id UUID,
    IN p_currency VARCHAR(3),
    IN p_amount NUMERIC(20, 8)
)
RETURNS VOID AS
security definer set search_path = public
$$
BEGIN
    INSERT INTO wallets (user_id, balance, currency)
    VALUES (p_user_id, p_amount, p_currency)
    ON CONFLICT (user_id, currency)
    DO UPDATE SET balance = wallets.balance + EXCLUDED.balance;
END;
$$
LANGUAGE plpgsql;




