import { Currency } from '../../modules/currency-exchange/types';

export const getCurrencyRateByAbbreviation = (
  currencies: Currency[],
  searchedAbbreviation: Currency['abbreviation'],
): Currency['rate'] => currencies.find((currency) => currency.abbreviation === searchedAbbreviation)?.rate;

export const setCurrencyInAccount = (
  updatedCurrency: Currency,
  userCurrencies: Currency[],
): Currency[] => {
  let hasCurrency = false;
  const updatedCurrencies = userCurrencies.map((currency) => {
    if (currency.abbreviation === updatedCurrency.abbreviation) {
      hasCurrency = true;
      return {
        ...currency,
        value: updatedCurrency.value,
      };
    }
    return currency;
  });

  return [...updatedCurrencies, ...(hasCurrency ? [] : [updatedCurrency])];
};

export const getUpdatedBalancesOnExchange = (
  isSell: boolean,
  firstCurrencyBalance: number,
  secondCurrencyBalance: number,
  firstComputedExchangeValue: number,
  secondComputedExchangeValue: number,
): [balance1: number, balance2: number] => {
  const firstBalanceAfterExchange = isSell
    ? firstCurrencyBalance - firstComputedExchangeValue
    : firstCurrencyBalance + firstComputedExchangeValue;

  const secondBalanceAfterExchange = isSell
    ? secondCurrencyBalance + secondComputedExchangeValue
    : secondCurrencyBalance - secondComputedExchangeValue;

  return [firstBalanceAfterExchange, secondBalanceAfterExchange];
};
