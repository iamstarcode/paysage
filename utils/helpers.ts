export const isCurrencyPresent = (wallets: any, id: any) => {
  return wallets.some(
    (item: { currencies: { id: any } }) => item.currencies.id === id
  )
}

export const selectBalanceByCurrency = (wallet: any, id: any) => {
  return wallet.find(
    (item: { currencies: { id: any } }) => item.currencies.id === id
  )
}
