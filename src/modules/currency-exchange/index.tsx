import React, { FC, FormEvent } from 'react';
import styled from 'styled-components';
import EditableCurrency from './editable-currency';
import { Currency } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
`;

const SellBuyToggle = styled.div`
  margin-bottom: 24px;
`;

const SubmitButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 32px;
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
  width: 100%;
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
  text-align: right;
`;

const CurrencyExchange: FC = () => {
  const firstCurrency: Currency = {
    abbreviation: 'JPY',
    symbol: '¥',
    name: 'yen',
    value: '125',
  };

  const accountBalance1 = '456.34';
  const accountBalance2 = '120.50';

  const secondCurrency: Currency = {
    abbreviation: 'USD',
    symbol: '$',
    name: 'dollar',
    value: '1500',
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <SellBuyToggle>Sell or Buy</SellBuyToggle>
      <form onSubmit={handleFormSubmit}>
        <EditableCurrency currency={firstCurrency} balance={accountBalance1} />
        <EditableCurrency currency={secondCurrency} balance={accountBalance2} />
        <ExchangeRate>
          1
          {firstCurrency.symbol}
          {' '}
          =
          {' '}
          {secondCurrency.symbol}
          0.4
        </ExchangeRate>
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
      </form>
    </Wrapper>
  );
};

export default CurrencyExchange;
