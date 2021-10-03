import React, { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../shared/reducers';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  box-sizing: border-box;
`;

const CustomButton = styled.button`
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

const SubmitButton: FC = () => {
  const { submitDisabled } = useSelector<IRootState, IRootState['exchangeForm']>(
    (state) => state.exchangeForm,
  );

  const {
    isSellActive,
    firstComparingCurrency,
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const buttonText = `${isSellActive ? 'Sell' : 'Buy'} ${firstComparingCurrency.abbreviation} 
    ${isSellActive ? 'for' : 'with'} ${secondComparingCurrency.abbreviation}`;

  return (
    <Wrapper>
      <CustomButton type="submit" disabled={submitDisabled}>
        {buttonText}
      </CustomButton>
    </Wrapper>
  );
};

export default SubmitButton;
