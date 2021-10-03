import reducer, { UserAccountState, setBalanceByCurrency } from './user-account.reducer';
import { Currency } from '../currency-exchange/types';

describe('UserAccountReducer', () => {
  describe('GetInitialState', () => {
    test('Is initial empty', () => {
      expect(reducer(undefined, { type: '' })).toEqual({
        userCurrencies: [],
      });
    });
  });

  describe('SetBalanceByCurrency', () => {
    let previousState: UserAccountState = {
      userCurrencies: [],
    };

    beforeEach(() => {
      previousState = {
        userCurrencies: [{ abbreviation: 'USD', value: 10000 }],
      };
    });

    test('Update balance for existing currency', () => {
      const updatingCurrency: Currency = {
        abbreviation: 'USD',
        value: 2000,
      };

      expect(reducer(previousState, setBalanceByCurrency(updatingCurrency))).toEqual({
        ...previousState,
        userCurrencies: [updatingCurrency],
      });
    });

    test('Set balance for new account currency', () => {
      const updatingCurrency: Currency = {
        abbreviation: 'EUR',
        value: 5000,
      };

      expect(reducer(previousState, setBalanceByCurrency(updatingCurrency))).toEqual({
        ...previousState,
        userCurrencies: [...previousState.userCurrencies, updatingCurrency],
      });
    });
  });
});
