import React, { FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EditableCurrency from '../editable-currency';
import { Currency } from '../types';
import {
  setFirstComparingCurrency,
  setSecondComparingCurrency,
} from '../currency-exchange.reducer';
import { IRootState } from '../../../shared/reducers';
import { FormInputNames } from './types';
import SubmitButton from './SubmitButton';
import useFormSubmit from './useFormSubmit';

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
  color: ${({ theme }) => theme.colors.error};
  text-align: right;
  margin-top: 20px;
  min-height: 12px;
`;

const ExchangeForm: FC = () => {
  const {
    exchangeCurrencies,
    firstComparingCurrency,
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const { errorMessage } = useSelector<IRootState, IRootState['exchangeForm']>(
    (state) => state.exchangeForm,
  );

  const { submitForm } = useFormSubmit();

  const dispatch = useDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  const handleOnFirstCurrencyChange = (currency: Currency) => {
    dispatch(setFirstComparingCurrency(currency));
    if (currency.abbreviation === secondComparingCurrency.abbreviation) {
      dispatch(setSecondComparingCurrency(firstComparingCurrency));
    }
  };

  const handleOnSecondCurrencyChange = (currency: Currency) => {
    dispatch(setSecondComparingCurrency(currency));
    if (currency.abbreviation === firstComparingCurrency.abbreviation) {
      dispatch(setFirstComparingCurrency(secondComparingCurrency));
    }
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
          onChange={handleOnSecondCurrencyChange}
          name={FormInputNames.SECOND_COMPARING_CURRENCY}
        />
      </CurrenciesWrapper>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
      <SubmitButton />
    </Form>
  );
};

export default ExchangeForm;
