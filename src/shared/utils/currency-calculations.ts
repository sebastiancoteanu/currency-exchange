import { Currency } from '../../modules/currency-exchange/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const a = () => ({});

export const getCurrencyRateByAbbreviation = (
  currencies: Currency[],
  searchedAbbreviation: Currency['abbreviation'],
): Currency['rate'] => currencies.find((curency) => curency.abbreviation === searchedAbbreviation)?.rate;
