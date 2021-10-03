import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '../currency-exchange/types';
import { fetchUserCurrencies } from '../../shared/utils/request-faker';
import { setCurrencyInAccount } from '../../shared/utils/currency-calculations';

export const ACTION_TYPES = {
  FETCH_USER_CURRENCIES: 'userAccount/FETCH_USER_CURRENCIES',
};

const initialState = {
  errorMessage: null,
  userCurrencies: [] as ReadonlyArray<Currency>,
};

export type UserAccountState = Readonly<typeof initialState>;

export const getUserCurrencies = createAsyncThunk(
  ACTION_TYPES.FETCH_USER_CURRENCIES,
  () => fetchUserCurrencies(),
);

const userAccount = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setBalanceByCurrency: (state, action: PayloadAction<Currency>) => ({
      ...state,
      userCurrencies: [...setCurrencyInAccount(action.payload, state.userCurrencies as Currency[])],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCurrencies.fulfilled, (state, action) => ({
      ...state,
      userCurrencies: action.payload,
    }));
  },
});

const { actions, reducer } = userAccount;

export const { setBalanceByCurrency } = actions;

export default reducer;
