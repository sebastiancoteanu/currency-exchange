import React, { FC } from 'react';
import styled from 'styled-components';
import { Currency } from '../types';

const Wrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Option = styled.div<{ active: boolean }>`
  font-size: 24px;
  align-self: center;
  cursor: pointer;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

const OptionSeparator = styled.span`
  margin: 0 6px;
  font-size: 32px;
`;

const CurrencyAbbreviation = styled.span`
  align-self: end;
  margin-left: 6px;
  font-weight: bold;
  font-size: 12px;
`;

interface Props {
  currency: Currency;
  isSellActive: boolean;
}

const ExchangeToggle: FC<Props> = ({ currency, isSellActive }) => (
  <Wrapper>
    <Option active={isSellActive}>Sell</Option>
    <OptionSeparator>/</OptionSeparator>
    <Option active={!isSellActive}>Buy</Option>
    <CurrencyAbbreviation>{currency.abbreviation}</CurrencyAbbreviation>
  </Wrapper>
);

export default ExchangeToggle;
