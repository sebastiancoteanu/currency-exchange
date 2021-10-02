import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPES } from './currency-exchange.reducer';
import { IRootState } from '../../shared/reducers';
import ExchangeRatesService from '../../services/ExchangeRatesService';
import { REQUEST, SUCCESS } from '../../shared/reducers/action-type.util';
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

  const currentAbbreviation = useMemo(() => firstComparingCurrency.abbreviation || userCurrencies[0]?.abbreviation,
    [userCurrencies, firstComparingCurrency]);

  useEffect(() => () => {
    clearTimeout(timeId);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

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
    dispatch({ type: REQUEST(ACTION_TYPES.FETCH_EXCHANGE_CURRENCIES) });
    const exchangeRates = await ExchangeRatesService.fetchRates(currentAbbreviation);
    dispatch({
      type: SUCCESS(ACTION_TYPES.FETCH_EXCHANGE_CURRENCIES),
      payload: exchangeRates,
    });
    timeId = setTimeout(fetchRates, EXCHANGE_RATES_POLLING_TIME);
  };
};

export default useExchangeRatesPolling;
