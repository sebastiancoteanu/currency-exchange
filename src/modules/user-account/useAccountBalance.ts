import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { IRootState } from '../../shared/reducers';

interface ReturnData {
  totalFirstCurrencyBalance: number;
  totalSecondCurrencyBalance: number;
}

type Hook = () => ReturnData;

const useAccountBalance: Hook = () => {
  const {
    firstComparingCurrency,
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const {
    userCurrencies,
  } = useSelector<IRootState, IRootState['userAccount']>(
    (state) => state.userAccount,
  );

  const totalFirstCurrencyBalance = useMemo(() => userCurrencies
    .find((currency) => currency.abbreviation === firstComparingCurrency.abbreviation)?.value || 0,
  [firstComparingCurrency.abbreviation, userCurrencies]);

  const totalSecondCurrencyBalance = useMemo(() => userCurrencies
    .find((currency) => currency.abbreviation === secondComparingCurrency.abbreviation)?.value || 0,
  [secondComparingCurrency.abbreviation, userCurrencies]);

  return {
    totalFirstCurrencyBalance,
    totalSecondCurrencyBalance,
  };
};

export default useAccountBalance;
