import { Dispatch } from 'redux';
import { Payload } from '../../shared/reducers/types';
import { Currency } from '../currency-exchange/types';

export type GetUserCurrenciesAction =
  () => Payload<Currency[]> | ((dispatch: Dispatch) => Payload<Currency[]>);

export type SetBalanceByCurrencyAction<T> = (currency: T) => Payload<T>;
