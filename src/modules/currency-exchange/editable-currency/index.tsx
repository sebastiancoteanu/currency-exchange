import React, { FC } from 'react';
import styled from 'styled-components';
import InputValue from './InputValue';
import { Currency } from '../types';

const Wrapper = styled.div`
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  display: flex;
  padding: 16px 8px;
  box-shadow: 0 2px 4px 0 ${({ theme }) => theme.colors.boxShadow};
  border-radius: 12px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const CurrencyStats = styled.div`
  display: flex;
  align-items: center;
`;

const Symbol = styled.div`
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondaryText};
  background-color: ${({ theme }) => theme.colors.accent};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-left: -28px;
  box-shadow: 0 -2px 2px 0 ${({ theme }) => theme.colors.boxShadow};
`;

const AbbreviationBalanceWrapper = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Abbreviation = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 24px;
  cursor: pointer;
`;

const AccountBalance = styled.div`
  color: ${({ theme }) => theme.colors.infoText};
  font-size: 12px;
  margin-bottom: -18px;
  padding-top: 6px;
`;

interface Props {
  currency: Currency;
  balance: string;
}

const EditableCurrency: FC<Props> = ({ currency, balance }) => (
  <Wrapper>
    <CurrencyStats>
      <Symbol>{currency.symbol}</Symbol>
      <AbbreviationBalanceWrapper>
        <Abbreviation>{currency.abbreviation}</Abbreviation>
        <AccountBalance>
          Balance:
          {' '}
          {balance}
        </AccountBalance>
      </AbbreviationBalanceWrapper>
    </CurrencyStats>
    <InputValue value={currency.value} name={currency.name} />
  </Wrapper>
);

export default EditableCurrency;
