import { Currency } from './types';
import { FAILURE, REQUEST, SUCCESS } from '../../shared/reducers/action-type.util';
import { getCurrencyRateByAbbreviation } from '../../shared/utils/currency-calculations';
import { BaseAction } from '../../shared/reducers/types';

export const ACTION_TYPES = {
  FETCH_EXCHANGE_CURRENCIES: 'currencyExchange/FETCH_EXCHANGE_CURRENCIES',
  SET_FIRST_COMPARING_CURRENCY: 'currencyExchange/SET_FIRST_COMPARING_CURRENCY',
  SET_SECOND_COMPARING_CURRENCY: 'currencyExchange/SET_SECOND_COMPARING_CURRENCY',
  SET_IS_SELL_ACTIVE: 'currencyExchange/SET_IS_SELL_ACTIVE',
};

const initialState = {
  loading: false,
  errorMessage: null,
  exchangeCurrencies: [] as ReadonlyArray<Currency>,
  firstComparingCurrency: {} as Readonly<Currency>,
  secondComparingCurrency: {} as Readonly<Currency>,
  isSellActive: true,
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
    case ACTION_TYPES.SET_IS_SELL_ACTIVE:
      return {
        ...state,
        isSellActive: action.payload,
        firstComparingCurrency: {
          ...state.firstComparingCurrency,
          ...state.secondComparingCurrency,
        },
        secondComparingCurrency: {
          ...state.secondComparingCurrency,
          ...state.firstComparingCurrency,
        },
      };
    default:
      return state;
  }
};

export const setFirstComparingCurrency: BaseAction<Currency> = (currency) => ({
  type: ACTION_TYPES.SET_FIRST_COMPARING_CURRENCY,
  payload: currency,
});

export const setSecondComparingCurrency: BaseAction<Currency> = (currency) => ({
  type: ACTION_TYPES.SET_SECOND_COMPARING_CURRENCY,
  payload: currency,
});

export const setIsSellActive: BaseAction<boolean> = (isSellActive) => ({
  type: ACTION_TYPES.SET_IS_SELL_ACTIVE,
  payload: isSellActive,
});
