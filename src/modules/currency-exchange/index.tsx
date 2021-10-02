import React, {
  FC, useEffect,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ExchangeToggle from './exchange-toggle';
import { IRootState } from '../../shared/reducers';
import {
  setFirstComparingCurrency,
  setSecondComparingCurrency,
} from './currency-exchange.reducer';
import { getUserCurrencies } from '../user-account/user-account.reducer';
import ExchangeForm from './exchange-form';
import ExchangeRate from './exchange-rate';
import useExchangeRatesPolling from './useExchangeRatesPolling';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
`;

const CurrencyExchange: FC = () => {
  const {
    exchangeCurrencies,
    firstComparingCurrency,
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const {
    userCurrencies,
  } = useSelector<IRootState, IRootState['userAccount']>(
    (state) => state.userAccount,
  );

  const dispatch = useDispatch();

  // fetch user currencies on mount
  useEffect(() => {
    dispatch(getUserCurrencies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // populate select components with first two user account options;
  // assume that he needs at least one to access the app
  useEffect(() => {
    if (userCurrencies.length
      && exchangeCurrencies.length
      && !firstComparingCurrency.abbreviation
      && !secondComparingCurrency.abbreviation
    ) {
      dispatch(setFirstComparingCurrency(userCurrencies[0]));
      dispatch(setSecondComparingCurrency(userCurrencies[1] || userCurrencies[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCurrencies, exchangeCurrencies]);

  useExchangeRatesPolling();

  if (!exchangeCurrencies.length || !userCurrencies.length) {
    return null;
  }

  return (
    <Wrapper>
      <ExchangeToggle />
      <ExchangeRate />
      <ExchangeForm />
    </Wrapper>
  );
};

export default CurrencyExchange;
