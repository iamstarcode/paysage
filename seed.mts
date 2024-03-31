import { createSeedClient } from "@snaplet/seed"

const seed = await createSeedClient()

const usersStore = await seed.users((x) => [
  {
    id: "0f5d546a-dd80-5406-a005-a4f3061b9fb4",
    instanceId: "00000000-0000-0000-0000-000000000000",
    aud: "authenticated",
    role: "authenticated",
    email: "iamstarcode@gmail.com",
    encryptedPassword:
      "$2a$10$CQCYDHo0dfJ2BAEYY5H/sOLMQSVZlO8gtpP56MuNVI.i/TMLT/CYu",
    emailConfirmedAt: "2023-02-24T19:57:41.849Z",
    invitedAt: null,
    confirmationSentAt: null,
    confirmationToken: "",
    recoveryToken: "",
    recoverySentAt: null,
    emailChangeTokenNew: "",
    emailChange: "",
    emailChangeSentAt: null,
    lastSignInAt: "2023-02-24T19:57:41.849Z",
    rawAppMetaData: { provider: "email", providers: ["email"] },
    rawUserMetaData: {},
    isSuperAdmin: null,
    //confiremdAt: "2023-02-24T19:57:41.849Z",
    bannedUntil: null,
    reauthenticationSentAt: null,
    createdAt: "2023-02-24T19:57:41.849Z",
    updatedAt: "2023-02-24T19:57:41.849Z",
    deletedAt: null,
  },

  {
    id: "32cd5412-c0a4-4830-af6a-33448b5dd5c2",
    instanceId: "00000000-0000-0000-0000-000000000000",
    aud: "authenticated",
    role: "authenticated",
    email: "favourking95@gmail.com",
    encryptedPassword:
      "$2a$10$VGQNx1KzIJ1DD0gz4.dL9uLYwFdSasKB0yoc/AkPfO2AJw44RRR5C",
    emailConfirmedAt: "2023-02-24T19:57:41.849Z",
    invitedAt: null,
    confirmationSentAt: null,
    confirmationToken: "",
    recoveryToken: "",
    recoverySentAt: null,
    emailChangeTokenNew: "",
    emailChange: "",
    emailChangeSentAt: null,
    lastSignInAt: "2023-02-24T19:57:41.849Z",
    rawAppMetaData: { provider: "email", providers: ["email"] },
    rawUserMetaData: {},
    isSuperAdmin: null,
    //confiremdAt: "2023-02-24T19:57:41.849Z",
    bannedUntil: null,
    reauthenticationSentAt: null,
    createdAt: "2023-02-24T19:57:41.849Z",
    updatedAt: "2023-02-24T19:57:41.849Z",
    deletedAt: null,
  },

  ...x(10),
])

const profileStore = await seed.profiles((x) => [
  {
    id: usersStore.users[0].id,
    username: "iamstarcode",
    firstName: "Bakare",
    lastName: "Abiola",
  },
  {
    id: usersStore.users[1].id,
    username: "favour",
    firstName: "Ijapa",
    lastName: "Tiroko",
  },
])

const depositAddressStore = await seed.depositAddresses((x) => [
  {
    userId: usersStore.users[0].id,
    address: "2N8rrDMrcySyhdVkx7UebnGzT45czmNQ3uJ",
    currency: "BTC",
    convertTo: "EUR",
  },
  {
    userId: usersStore.users[0].id,
    address: "0x6D94a9301B042fB5FCaae650171F4C2B101c8d9F",
    currency: "ETH",
    convertTo: "EUR",
  },
  {
    userId: usersStore.users[0].id,
    address: "2N7tjZgyJWMkDZMyx4Ffm4W7igVXSG6DiL8",
    currency: "BTC",
    convertTo: null,
  },
  {
    userId: usersStore.users[0].id,
    address: "0xA64B45063BD8C41538E817E43FEDdf8754B85cDd",
    currency: "ETH",
    convertTo: null,
  },
])
/* const walletSrore = await seed.wallets((x) => [
  {
    balance: 5000,
    userId: usersStore.users[0].id,
    currencyId: 37, //Naira
  },
  {
    balance: 5000,
    userId: usersStore.users[0].id,
    currencyId: 4, //Dollar
  },

  {
    balance: 1.5,
    userId: usersStore.users[0].id,
    currencyId: 1, //BTC
  },

  {
    balance: 5000,
    userId: usersStore.users[1].id,
    currencyId: 37,
  },
]) */

/* const transactions = await seed.transactions(()=>[{
  
}]) */

//await seed.transactions((x) => x(3))
