import {
  getCurrencyRateByAbbreviation,
  getUpdatedBalancesOnExchange,
  setCurrencyInAccount,
} from '../shared/utils/currency-calculations';
import { Currency } from '../modules/currency-exchange/types';

describe('Currency calculations', () => {
  let userCurrencies: Currency[] = [];
  let existingCurrency: Currency = {} as Currency;
  let newCurrency: Currency = {} as Currency;

  describe('GetCurrencyRateByAbbreviation', () => {
    beforeAll(() => {
      userCurrencies = [{
        abbreviation: 'USD',
        symbol: '$',
        value: 15000,
        rate: 1,
      }, {
        abbreviation: 'EUR',
        symbol: '€',
        value: 10000,
        rate: 0.9,
      }, {
        abbreviation: 'JPY',
        symbol: '¥',
        value: 20000,
        rate: 30,
      }];
    });

    test('Abbreviation exists', () => {
      expect(getCurrencyRateByAbbreviation(userCurrencies, 'USD')).toBe(1);
    });

    test('Abbreviation does not exist', () => {
      expect(getCurrencyRateByAbbreviation(userCurrencies, 'RON')).toBe(undefined);
    });
  });

  describe('SetCurrencyInAccount', () => {
    beforeAll(() => {
      existingCurrency = {
        abbreviation: 'USD',
        symbol: '$',
        value: 8000,
        rate: 1,
      };
      newCurrency = {
        abbreviation: 'RON',
        symbol: 'R',
        value: 10000,
        rate: 4.5,
      };
    });

    beforeEach(() => {
      userCurrencies = [{
        abbreviation: 'USD',
        symbol: '$',
        value: 15000,
        rate: 1,
      }, {
        abbreviation: 'EUR',
        symbol: '€',
        value: 10000,
        rate: 0.9,
      }, {
        abbreviation: 'JPY',
        symbol: '¥',
        value: 20000,
        rate: 30,
      }];
    });

    test('Update currency in account', () => {
      const result: Currency[] = [{
        abbreviation: 'USD',
        symbol: '$',
        value: 8000,
        rate: 1,
      }, {
        abbreviation: 'EUR',
        symbol: '€',
        value: 10000,
        rate: 0.9,
      }, {
        abbreviation: 'JPY',
        symbol: '¥',
        value: 20000,
        rate: 30,
      }];

      expect(setCurrencyInAccount(existingCurrency, userCurrencies)).toEqual(result);
    });

    test('Add currency in account', () => {
      const result: Currency[] = [{
        abbreviation: 'USD',
        symbol: '$',
        value: 15000,
        rate: 1,
      }, {
        abbreviation: 'EUR',
        symbol: '€',
        value: 10000,
        rate: 0.9,
      }, {
        abbreviation: 'JPY',
        symbol: '¥',
        value: 20000,
        rate: 30,
      }, {
        abbreviation: 'RON',
        symbol: 'R',
        value: 10000,
        rate: 4.5,
      }];

      expect(setCurrencyInAccount(newCurrency, userCurrencies)).toEqual(result);
    });
  });

  describe('GetUpdatedBalancesOnExchange', () => {
    test('Sell operation', () => {
      expect(getUpdatedBalancesOnExchange(
        true,
        4000,
        3000,
        1000,
        2000,
      )).toEqual([3000, 5000]);
    });

    test('Buy operation', () => {
      expect(getUpdatedBalancesOnExchange(
        false,
        4000,
        3000,
        1000,
        2000,
      )).toEqual([5000, 1000]);
    });
  });
});
