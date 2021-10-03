import { Currency } from '../../modules/currency-exchange/types';
import { FormInputNames } from '../../modules/currency-exchange/exchange-form/types';
import { ExchangeFormState } from '../../modules/currency-exchange/exchange-form/exchange-form.reducer';

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

export const getComputedFormData = (
  firstInputChanged: boolean,
  value: string,
  currencyRate: number,
): Partial<ExchangeFormState['formData']> => {
  const formData: Partial<ExchangeFormState['formData']> = {};

  const parsedValue = Number(value);

  if (firstInputChanged) {
    formData.firstComparingCurrencyValue = value;
    formData.secondComparingCurrencyValue = String(+(parsedValue
      * currencyRate).toFixed(2));
  } else {
    formData.firstComparingCurrencyValue = String(+(parsedValue
      / currencyRate).toFixed(2));
    formData.secondComparingCurrencyValue = value;
  }

  return formData;
};
