import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeCurrencies } from './currency-exchange.reducer';
import { IRootState } from '../../shared/reducers';
import { EXCHANGE_RATES_POLLING_TIME } from '../../constants';

let timeId = 0;

const useExchangeRatesPolling = (): void => {
  const dispatch = useDispatch();

  const {
    firstComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const {
    userCurrencies,
  } = useSelector<IRootState, IRootState['userAccount']>(
    (state) => state.userAccount,
  );

  const hasUserCurrencies = !!userCurrencies.length;

  // get currency abbreviation when first currency changes or when user currencies are loaded
  const currentAbbreviation = useMemo(() => firstComparingCurrency.abbreviation || userCurrencies[0]?.abbreviation,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasUserCurrencies, firstComparingCurrency]);

  useEffect(() => () => {
    clearTimeout(timeId);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  // start polling exchange rates when current abbreviation changes;
  // cancel previous poll
  useEffect(() => {
    if (currentAbbreviation) {
      pollExchangeRates();
    }

    return () => {
      clearTimeout(timeId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAbbreviation]);

  const pollExchangeRates = async function fetchRates(_?: number) {
    dispatch(getExchangeCurrencies(currentAbbreviation));
    timeId = setTimeout(fetchRates, EXCHANGE_RATES_POLLING_TIME);
  };
};

export default useExchangeRatesPolling;
