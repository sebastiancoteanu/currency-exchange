import { Currency } from '../../modules/currency-exchange/types';

export const getCurrencyRateByAbbreviation = (
  currencies: Currency[],
  searchedAbbreviation: Currency['abbreviation'],
): Currency['rate'] => currencies.find((curency) => curency.abbreviation === searchedAbbreviation)?.rate;

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
