import { useDispatch, useSelector } from 'react-redux';
import { FormInputNames } from './types';
import { setBalanceByCurrency } from '../../user-account/user-account.reducer';
import { setFormData } from './exchange-form.reducer';
import { IRootState } from '../../../shared/reducers';
import useAccountBalance from '../../user-account/useAccountBalance';

interface ReturnData {
  submitForm: () => void;
}

type Hook = () => ReturnData;

const useFormSubmit: Hook = () => {
  const dispatch = useDispatch();
  const {
    isSellActive,
    firstComparingCurrency,
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const {
    formData,
  } = useSelector<IRootState, IRootState['exchangeForm']>(
    (state) => state.exchangeForm,
  );

  const { totalFirstCurrencyBalance, totalSecondCurrencyBalance } = useAccountBalance();

  const submitForm = () => {
    const firstComparingCurrencyValue = Number(formData[FormInputNames.FIRST_COMPARING_CURRENCY]);
    const secondComparingCurrencyValue = Number(formData[FormInputNames.SECOND_COMPARING_CURRENCY]);

    const firstCurrencyNewBalance = isSellActive
      ? totalFirstCurrencyBalance - firstComparingCurrencyValue
      : totalFirstCurrencyBalance + firstComparingCurrencyValue;

    const secondCurrencyNewBalance = isSellActive
      ? totalSecondCurrencyBalance + secondComparingCurrencyValue
      : totalSecondCurrencyBalance - secondComparingCurrencyValue;

    dispatch(setBalanceByCurrency({
      value: firstCurrencyNewBalance,
      abbreviation: firstComparingCurrency.abbreviation,
    }));

    dispatch(setBalanceByCurrency({
      value: secondCurrencyNewBalance,
      abbreviation: secondComparingCurrency.abbreviation,
    }));

    dispatch(setFormData({
      [FormInputNames.FIRST_COMPARING_CURRENCY]: '0',
      [FormInputNames.SECOND_COMPARING_CURRENCY]: '0',
    }));
  };

  return {
    submitForm,
  };
};

export default useFormSubmit;
