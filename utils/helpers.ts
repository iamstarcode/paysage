export const isCurrencyPresent = (wallets: any, currencyCode: any) => {
  return wallets.some(
    (item: { currencies: { currency_code: any } }) =>
      item.currencies.currency_code === currencyCode
  )
}

export const selectBalanceByCurrency = (wallet: any, currencyCode: any) => {
  return wallet.find(
    (item: { currencies: { currency_code: any } }) =>
      item.currencies.currency_code === currencyCode
  )
}
