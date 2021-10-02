import { combineReducers } from 'redux';
import currencyExchange, {
  CurrencyExchangeState,
} from '../../modules/currency-exchange/currency-exchange.reducer';
import userAccount, {
  UserAccountState,
} from '../../modules/user-account/user-account.reducer';
import exchangeForm, {
  ExchangeFormState,
} from '../../modules/currency-exchange/exchange-form/exchange-form.reducer';

export interface IRootState {
  readonly currencyExchange: CurrencyExchangeState;
  readonly userAccount: UserAccountState;
  readonly exchangeForm: ExchangeFormState;
}

const rootReducer = combineReducers<IRootState>({
  currencyExchange,
  userAccount,
  exchangeForm,
});

export default rootReducer;
