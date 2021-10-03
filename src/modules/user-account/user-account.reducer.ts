import { Currency } from '../currency-exchange/types';
import { FAILURE, REQUEST, SUCCESS } from '../../shared/reducers/action-type.util';
import { fetchUserCurrencies } from '../../shared/utils/request-faker';
import { GetUserCurrenciesAction, SetBalanceByCurrencyAction } from './types';
import { setCurrencyInAccount } from '../../shared/utils/currency-calculations';

export const ACTION_TYPES = {
  FETCH_USER_CURRENCIES: 'userAccount/FETCH_USER_CURRENCIES',
  SET_BALANCE_BY_CURRENCY: 'userAccount/SET_BALANCE_BY_CURRENCY',
};

const initialState = {
  loading: false,
  errorMessage: null,
  userCurrencies: [] as ReadonlyArray<Currency>,
};

export type UserAccountState = Readonly<typeof initialState>;

// eslint-disable-next-line
export default (state: UserAccountState = initialState, action: any): UserAccountState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USER_CURRENCIES):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USER_CURRENCIES):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USER_CURRENCIES):
      return {
        ...state,
        loading: false,
        userCurrencies: action.payload,
      };
    case ACTION_TYPES.SET_BALANCE_BY_CURRENCY:
      return {
        ...state,
        userCurrencies: setCurrencyInAccount(action.payload, state.userCurrencies as Currency[]),
      };
    default:
      return state;
  }
};

export const getUserCurrencies: GetUserCurrenciesAction = () => ({
  type: ACTION_TYPES.FETCH_USER_CURRENCIES,
  payload: fetchUserCurrencies(),
});

export const setBalanceByCurrency: SetBalanceByCurrencyAction<Partial<Currency>> = (currency) => ({
  type: ACTION_TYPES.SET_BALANCE_BY_CURRENCY,
  payload: currency,
});
