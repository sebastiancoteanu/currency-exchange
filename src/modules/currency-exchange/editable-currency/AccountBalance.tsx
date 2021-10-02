import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../shared/reducers';
import { Currency } from '../types';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.infoText};
  font-size: 12px;
  margin-bottom: -18px;
  padding-top: 6px;
`;

interface Props {
  abbreviation: Currency['abbreviation'];
}

const AccountBalance: FC<Props> = ({ abbreviation }) => {
  const {
    userCurrencies,
  } = useSelector<IRootState, IRootState['userAccount']>(
    (state) => state.userAccount,
  );

  const totalBalance = useMemo(() => userCurrencies
    .find((currency) => currency.abbreviation === abbreviation)?.value || 0,
  [abbreviation, userCurrencies]);

  return (
    <Wrapper>
      Balance:
      {' '}
      {totalBalance}
    </Wrapper>
  );
};

export default AccountBalance;
