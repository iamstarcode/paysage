
CREATE TABLE public.profiles (
    id uuid not null references auth.users on delete cascade,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),
    primary key (id)
);
-- CREATE INDEX idx_profile_user_id ON public.profiles(user_id);
ALTER TABLE public.profiles enable row level security;
create policy "Public profiles are viewable only by authenticated users"
    on public.profiles for select
    to authenticated
    using ( true );
CREATE POLICY "Users can update own profile."
    on public.profiles for update
    using ( auth.uid() = id );


CREATE TYPE currency_type AS ENUM (
  'crypto',
  'fiat'
);

CREATE TABLE public.wallets (
    id bigint generated by default as identity primary key,
    user_id uuid references auth.users on delete cascade not null, -- Reference to the user who owns the wallet
    balance NUMERIC(20, 8) DEFAULT 0, -- Balance of the currency in the wallet
    currency VARCHAR(10),
    UNIQUE(user_id, currency) -- Ensure each user has only one wallet per currency
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
    currency VARCHAR(10) NOT NULL,
    convert_to VARCHAR(10),
    address  VARCHAR(200) NOT NULL,
    CONSTRAINT uq_currency_null UNIQUE NULLS NOT DISTINCT(currency, convert_to)
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

CREATE TYPE transaction_type AS ENUM (
  'fiat',
  'airtime',
  'crypto-deposit'
);
CREATE TYPE transaction_status AS ENUM (
  'processing',
  'confirmed',
  'fialed',
  'not_confirmed'
);



CREATE TABLE public.transactions (
    id bigint generated by default as identity primary key,
    sender_id uuid references auth.users,
    receiver_id uuid references auth.users,
    amount DECIMAL(18, 6),
    currency VARCHAR(10),
    name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_type transaction_type NOT NULL,
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
alter table public.crypto_transactions enable row level security;
create policy "Only auth Users can view own crypto txn."
    on public.crypto_transactions for select
    to authenticated 
    using ( auth.uid() = user_id );

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

--Fxns

CREATE OR REPLACE FUNCTION public.upsert_wallet_balance(
    IN p_user_id UUID,
    IN p_currency VARCHAR(10),
    IN p_amount NUMERIC(20, 8)
)
RETURNS VOID 
security definer set search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
     -- Check if a record already exists for the given user_id and currency
    IF EXISTS (
        SELECT 1
        FROM wallets
        WHERE user_id = p_user_id AND currency = p_currency
    ) THEN
        -- Update the balance if a record already exists
        UPDATE wallets
        SET balance = balance + p_amount
        WHERE user_id = p_user_id AND currency = p_currency;
    ELSE
        -- Insert a new record if no record exists
        INSERT INTO wallets (user_id, balance, currency)
        VALUES (p_user_id, p_amount, p_currency);
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = public
as $$
begin
   -- Check if the action is an INSERT on the users table
    IF NEW.id IS NOT NULL THEN
        -- Insert a corresponding entry into the profiles table
        INSERT INTO profiles (user_id)
        VALUES (NEW.id);
    END IF;
    RETURN NULL; -- Returning NULL because this is an "AFTER INSERT" trigger
end;
$$;

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

-- Might delete this in favour of using service_role key, to update and delete sender and reciever balances
grant execute on function public.transfer_funds(text, text, numeric, bigint) to authenticated;



--To maually insert profile
/* CREATE OR REPLCAE TRIGGER create_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user(); */


