import React, { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../shared/reducers';

const Wrapper = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: bold;
  text-align: left;
  margin-bottom: 16px;
`;

const ExchangeRate: FC = () => {
  const {
    firstComparingCurrency,
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const computedExchangeRateText = `Exchange rate: ${firstComparingCurrency.symbol}1 = 
  ${secondComparingCurrency.symbol}${secondComparingCurrency.rate}`;

  return (
    <Wrapper>
      {computedExchangeRateText}
    </Wrapper>
  );
};

export default ExchangeRate;
