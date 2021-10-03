import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from './types';
import { getCurrencyRateByAbbreviation } from '../../shared/utils/currency-calculations';
import ExchangeRatesService from '../../services/ExchangeRatesService';

export const ACTION_TYPES = {
  FETCH_EXCHANGE_CURRENCIES: 'currencyExchange/FETCH_EXCHANGE_CURRENCIES',
};

const initialState = {
  errorMessage: null,
  exchangeCurrencies: [] as ReadonlyArray<Currency>,
  firstComparingCurrency: {} as Readonly<Currency>,
  secondComparingCurrency: {} as Readonly<Currency>,
  isSellActive: true,
};

export type CurrencyExchangeState = Readonly<typeof initialState>;

export const getExchangeCurrencies = createAsyncThunk(
  ACTION_TYPES.FETCH_EXCHANGE_CURRENCIES,
  (currentAbbreviation: Currency['abbreviation']) => ExchangeRatesService.fetchRates(currentAbbreviation),
);

const currencyExchange = createSlice({
  name: 'currencyExchange',
  initialState,
  reducers: {
    setFirstComparingCurrency: (state, action: PayloadAction<Currency>) => ({
      ...state,
      firstComparingCurrency: {
        ...state.firstComparingCurrency,
        ...action.payload,
      },
    }),
    setSecondComparingCurrency: (state, action: PayloadAction<Currency>) => ({
      ...state,
      secondComparingCurrency: {
        ...state.secondComparingCurrency,
        ...action.payload,
        rate: getCurrencyRateByAbbreviation(
            state.exchangeCurrencies as Currency[],
            (action.payload as Currency).abbreviation,
        ),
      },
    }),
    setIsSellActive: (state, action: PayloadAction<boolean>) => ({
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
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getExchangeCurrencies.fulfilled, (state, action) => ({
      ...state,
      exchangeCurrencies: action.payload,
      secondComparingCurrency: state.secondComparingCurrency.abbreviation ? {
        ...state.secondComparingCurrency,
        rate: getCurrencyRateByAbbreviation(
            action.payload as Currency[],
            state.secondComparingCurrency.abbreviation,
        ),
      } : state.secondComparingCurrency,
    }));
  },
});

const { actions, reducer } = currencyExchange;

export const { setIsSellActive, setFirstComparingCurrency, setSecondComparingCurrency } = actions;

export default reducer;
