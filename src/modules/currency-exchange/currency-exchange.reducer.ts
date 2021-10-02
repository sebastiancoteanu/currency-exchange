import {
  Currency,
  GetExchangeCurrenciesAction,
  SetComparingCurrencyAction,
} from './types';
import ExchangeRatesService from '../../services/ExchangeRatesService';
import { FAILURE, REQUEST, SUCCESS } from '../../shared/reducers/action-type.util';
import { getCurrencyRateByAbbreviation } from '../../shared/utils/currency-calculations';

export const ACTION_TYPES = {
  FETCH_EXCHANGE_CURRENCIES: 'currencyExchange/FETCH_EXCHANGE_CURRENCIES',
  SET_FIRST_COMPARING_CURRENCY: 'currencyExchange/SET_FIRST_COMPARING_CURRENCY',
  SET_SECOND_COMPARING_CURRENCY: 'currencyExchange/SET_SECOND_COMPARING_CURRENCY',
};

const initialState = {
  loading: false,
  errorMessage: null,
  exchangeCurrencies: [] as ReadonlyArray<Currency>,
  firstComparingCurrency: {} as Readonly<Currency>,
  secondComparingCurrency: {} as Readonly<Currency>,
};

export type CurrencyExchangeState = Readonly<typeof initialState>;

// eslint-disable-next-line
export default (state: CurrencyExchangeState = initialState, action: any): CurrencyExchangeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXCHANGE_CURRENCIES):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EXCHANGE_CURRENCIES):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXCHANGE_CURRENCIES):
      return {
        ...state,
        loading: false,
        exchangeCurrencies: action.payload,
        secondComparingCurrency: state.secondComparingCurrency.abbreviation ? {
          ...state.secondComparingCurrency,
          rate: getCurrencyRateByAbbreviation(
            action.payload as Currency[],
            state.secondComparingCurrency.abbreviation,
          ),
        } : state.secondComparingCurrency,
      };
    case ACTION_TYPES.SET_FIRST_COMPARING_CURRENCY:
      return {
        ...state,
        firstComparingCurrency: action.payload,
      };
    case ACTION_TYPES.SET_SECOND_COMPARING_CURRENCY:
      return {
        ...state,
        secondComparingCurrency: {
          ...action.payload,
          rate: getCurrencyRateByAbbreviation(
            state.exchangeCurrencies as Currency[],
            (action.payload as Currency).abbreviation,
          ),
        },
      };
    default:
      return state;
  }
};

export const getExchangeCurrencies: GetExchangeCurrenciesAction = (currencyAbbreviation) => ({
  type: ACTION_TYPES.FETCH_EXCHANGE_CURRENCIES,
  payload: ExchangeRatesService.fetchRates(currencyAbbreviation),
});

export const setFirstComparingCurrency: SetComparingCurrencyAction = (currency) => ({
  type: ACTION_TYPES.SET_FIRST_COMPARING_CURRENCY,
  payload: currency,
});

export const setSecondComparingCurrency: SetComparingCurrencyAction = (currency) => ({
  type: ACTION_TYPES.SET_SECOND_COMPARING_CURRENCY,
  payload: currency,
});
