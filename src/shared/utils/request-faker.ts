import { Currency } from '../../modules/currency-exchange/types';

const delay = async () => new Promise((resolve) => {
  setTimeout(resolve.bind(null), 250);
});

// eslint-disable-next-line import/prefer-default-export
export const fetchUserCurrencies = async (): Promise<Currency[]> => {
  await delay();
  return [{
    abbreviation: 'USD',
    symbol: '$',
    value: 15000,
  }, {
    abbreviation: 'EUR',
    symbol: '€',
    value: 10000,
  }, {
    abbreviation: 'JPY',
    symbol: '¥',
    value: 20000,
  }];
};
