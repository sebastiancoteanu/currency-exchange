import React, { FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EditableCurrency from '../editable-currency';
import { Currency } from '../types';
import {
  getExchangeCurrencies,
  setFirstComparingCurrency,
  setSecondComparingCurrency,
} from '../currency-exchange.reducer';
import { IRootState } from '../../../shared/reducers';
import { FormInputNames } from './types';
import { setBalanceByCurrency } from '../../user-account/user-account.reducer';
import useAccountBalance from '../../user-account/useAccountBalance';
import { setFormData } from './exchange-form.reducer';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const CurrenciesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormErrorMessage = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: red;
  text-align: right;
  margin-top: 20px;
  min-height: 12px;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  border: none;
  outline: none;
  appearance: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.secondaryText};
  padding: 24px;
  border-radius: 12px;
  font-size: 16px;
  font-family: 'nunito', sans-serif;
  transition: all 0.1s ease-in;
  opacity: 1;
  
  &:hover:enabled {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const ExchangeForm: FC = () => {
  const {
    exchangeCurrencies,
    firstComparingCurrency,
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const {
    errorMessage,
    submitDisabled,
    formData,
  } = useSelector<IRootState, IRootState['exchangeForm']>(
    (state) => state.exchangeForm,
  );

  const { totalFirstCurrencyBalance, totalSecondCurrencyBalance } = useAccountBalance();

  const dispatch = useDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstComparingCurrencyValue = Number(formData[FormInputNames.FIRST_COMPARING_CURRENCY]);
    // const secondComparingCurrencyValue = Number(formData[FormInputNames.SECOND_COMPARING_CURRENCY]);

    const exchangeRate = secondComparingCurrency.rate as number;

    const firstCurrencyNewBalance = totalFirstCurrencyBalance - firstComparingCurrencyValue;

    const secondCurrencyNewBalance = totalSecondCurrencyBalance + firstComparingCurrencyValue * exchangeRate;

    dispatch(setBalanceByCurrency({
      value: firstCurrencyNewBalance,
      abbreviation: firstComparingCurrency.abbreviation,
    }));

    dispatch(setBalanceByCurrency({
      value: secondCurrencyNewBalance,
      abbreviation: secondComparingCurrency.abbreviation,
    }));

    dispatch(setFormData({
      [FormInputNames.FIRST_COMPARING_CURRENCY]: '0',
      [FormInputNames.SECOND_COMPARING_CURRENCY]: '0',
    }));
  };

  const handleOnFirstCurrencyChange = (currency: Currency) => {
    dispatch(setFirstComparingCurrency(currency));
    dispatch(getExchangeCurrencies(currency.abbreviation));
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <CurrenciesWrapper>
        <EditableCurrency
          currency={firstComparingCurrency}
          exchangeRates={exchangeCurrencies as Currency[]}
          onChange={handleOnFirstCurrencyChange}
          name={FormInputNames.FIRST_COMPARING_CURRENCY}
        />
        <EditableCurrency
          currency={secondComparingCurrency}
          exchangeRates={exchangeCurrencies as Currency[]}
          onChange={(currency) => dispatch(setSecondComparingCurrency(currency))}
          name={FormInputNames.SECOND_COMPARING_CURRENCY}
        />
      </CurrenciesWrapper>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
      <SubmitButtonWrapper>
        <SubmitButton type="submit" disabled={submitDisabled}>
          Sell
          {' '}
          {firstComparingCurrency.abbreviation}
          {' '}
          for
          {' '}
          {secondComparingCurrency.abbreviation}
        </SubmitButton>
      </SubmitButtonWrapper>
    </Form>
  );
};

export default ExchangeForm;
