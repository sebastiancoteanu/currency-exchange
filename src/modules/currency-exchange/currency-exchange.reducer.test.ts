import reducer, {
  CurrencyExchangeState,
  setFirstComparingCurrency,
  setSecondComparingCurrency,
  setIsSellActive,
} from './currency-exchange.reducer';
import { Currency } from './types';

describe('CurrencyExchangeReducer', () => {
  describe('GetInitialState', () => {
    test('Is initial empty', () => {
      expect(reducer(undefined, { type: '' })).toEqual({
        exchangeCurrencies: [],
        errorMessage: null,
        firstComparingCurrency: {},
        secondComparingCurrency: {},
        isSellActive: true,
      });
    });
  });

  describe('Sets comparing currency', () => {
    const currencyToBeSet: Currency = {
      abbreviation: 'JPY',
      value: 10000,
    };

    let previousState: CurrencyExchangeState = {
      errorMessage: null,
      firstComparingCurrency: {} as Currency,
      secondComparingCurrency: {} as Currency,
      isSellActive: false,
      exchangeCurrencies: [],
    };

    beforeEach(() => {
      previousState = {
        ...previousState,
        firstComparingCurrency: {
          abbreviation: 'USD', value: 10000,
        },
        secondComparingCurrency: {
          abbreviation: 'EUR', value: 20000,
        },
      };
    });

    describe('SetFirstComparingCurrency', () => {
      test('Sets first comparing currency', () => {
        expect(reducer(previousState, setFirstComparingCurrency(currencyToBeSet))).toEqual({
          ...previousState,
          firstComparingCurrency: currencyToBeSet,
        });
      });
    });

    describe('SetSecondComparingCurrency', () => {
      test('Sets second comparing currency', () => {
        expect(reducer(previousState, setSecondComparingCurrency(currencyToBeSet))).toEqual({
          ...previousState,
          secondComparingCurrency: currencyToBeSet,
        });
      });
    });
  });

  describe('SetIsSellActive', () => {
    const previousState: CurrencyExchangeState = {
      exchangeCurrencies: [],
      isSellActive: false,
      firstComparingCurrency: { abbreviation: 'RON', value: 11000 },
      secondComparingCurrency: { abbreviation: 'USD', value: 10000 },
      errorMessage: null,
    };

    test('Activate sell', () => {
      expect(reducer(previousState, setIsSellActive(true))).toEqual({
        ...previousState,
        firstComparingCurrency: previousState.secondComparingCurrency,
        secondComparingCurrency: previousState.firstComparingCurrency,
        exchangeCurrencies: [],
        errorMessage: null,
        isSellActive: true,
      });
    });
  });
});
