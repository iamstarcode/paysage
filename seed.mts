import { createSeedClient } from "@snaplet/seed"

const seed = await createSeedClient()

//await seed.users((x) => x(10))

const currencyStore = await seed.currencies([
  {
    currencyName: "Naira",
    currencyCode: "NG",
  },
  {
    currencyName: "Dollar",
    currencyCode: "USD",
  },
])
