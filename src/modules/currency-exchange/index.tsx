import React, {
  FC, FormEvent, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import EditableCurrency from './editable-currency';
import { Currency } from './types';
import ExchangeToggle from './exchange-toggle';
import ExchangeRatesService from '../../services/ExchangeRatesService';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const CurrenciesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  
  &:hover {
    opacity: 0.8;
  }
`;

const ExchangeRate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: bold;
  text-align: left;
  margin-bottom: 16px;
`;

const CurrencyExchange: FC = () => {
  const [exchangeRates, setExchangeRates] = useState<Currency[]>([]);

  const firstCurrency: Currency = {
    abbreviation: 'JPY',
    symbol: '¥',
    value: '125',
    rate: 1.2,
  };

  const accountBalance1 = '456.34';
  const accountBalance2 = '120.50';

  const secondCurrency: Currency = {
    abbreviation: 'USD',
    symbol: '$',
    value: '1500',
    rate: 1.14,
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function fetchRates() {
      const result = await ExchangeRatesService.fetchRates('EUR');
      setExchangeRates(result);
    }
    fetchRates();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('exchangeRates', exchangeRates);
  }, [exchangeRates]);

  return (
    <Wrapper>
      <ExchangeToggle currency={firstCurrency} isSellActive />
      <ExchangeRate>
        Exchange rate:
        {' '}
        1
        {firstCurrency.symbol}
        {' '}
        =
        {' '}
        {secondCurrency.symbol}
        0.4
      </ExchangeRate>
      <Form onSubmit={handleFormSubmit}>
        <CurrenciesWrapper>
          <EditableCurrency
            currency={firstCurrency}
            balance={accountBalance1}
            exchangeRates={exchangeRates}
          />
          <EditableCurrency
            currency={secondCurrency}
            balance={accountBalance2}
            exchangeRates={exchangeRates}
          />
        </CurrenciesWrapper>
        <SubmitButtonWrapper>
          <SubmitButton type="submit">
            Sell
            {' '}
            {firstCurrency.abbreviation}
            {' '}
            for
            {' '}
            {secondCurrency.abbreviation}
          </SubmitButton>
        </SubmitButtonWrapper>
      </Form>
    </Wrapper>
  );
};

export default CurrencyExchange;
