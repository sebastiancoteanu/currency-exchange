import { EXCHANGE_RATES_URL } from '../constants';
import { Currency, FetchedExchangeRates, SupportedCurrencySymbols } from '../modules/currency-exchange/types';

const parseExchangeRates = (
  fetchedExchangeRates: FetchedExchangeRates,
): Currency[] => Object.entries(fetchedExchangeRates)
  .map(([abbreviation, rate]) => ({
    abbreviation,
    symbol: abbreviation in SupportedCurrencySymbols
      ? SupportedCurrencySymbols[abbreviation as keyof typeof SupportedCurrencySymbols]
      : abbreviation.charAt(0),
    rate,
    value: '0',
  }));

class ExchangeRatesService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static async fetchRates(currencyAbbreviation: Currency['abbreviation']): Promise<Currency[]> {
    const response = await fetch(`${EXCHANGE_RATES_URL}/${currencyAbbreviation}`);
    const exchangeRates = await response.json();
    return parseExchangeRates(exchangeRates?.conversion_rates);
  }
}

export default ExchangeRatesService;
