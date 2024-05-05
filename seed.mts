import { createSeedClient } from "@snaplet/seed"

const seed = await createSeedClient()

const usersStore = await seed.users((x) => [
  {
    id: "200dd8c7-2014-45e6-a13a-8b890e58ae91",
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
    id: "bad44483-1980-4e15-8260-ccfbe37f8207",
    instanceId: "00000000-0000-0000-0000-000000000000",
    aud: "authenticated",
    role: "authenticated",
    email: "murphybiola007@gmail.com",
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
    address: "2NAAfTFfVAkurdT415XXXBNrMruxDtckjyQ",
    currency: "BTC",
    convertTo: "EUR",
  },
  {
    userId: usersStore.users[0].id,
    address: "0x8EB254Fe50beF737FdA0F564d58Be8648F66e709",
    currency: "ETH",
    convertTo: "EUR",
  },
  {
    userId: usersStore.users[0].id,
    address: "2N8bKiCeLhTMp38QYo1VvMKizdx92gMu3r5",
    currency: "BTC",
    convertTo: null,
  },
  {
    userId: usersStore.users[0].id,
    address: "0x372410adEA242C93007a662006584e04959aA2B9",
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
