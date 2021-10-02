import React, { FC } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../shared/reducers';
import { setIsSellActive } from '../currency-exchange.reducer';

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

const ExchangeToggle: FC = () => {
  const {
    isSellActive,
    firstComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const dispatch = useDispatch();

  const toggleIsSellActive = (isActive: boolean) => isActive !== isSellActive && dispatch(setIsSellActive(isActive));

  return (
    <Wrapper>
      <Option active={isSellActive} onClick={() => toggleIsSellActive(true)}>Sell</Option>
      <OptionSeparator>/</OptionSeparator>
      <Option active={!isSellActive} onClick={() => toggleIsSellActive(false)}>Buy</Option>
      <CurrencyAbbreviation>{firstComparingCurrency.abbreviation}</CurrencyAbbreviation>
    </Wrapper>
  );
};

export default ExchangeToggle;
