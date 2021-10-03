import { useDispatch, useSelector } from 'react-redux';
import { FormInputNames } from './types';
import { setBalanceByCurrency } from '../../user-account/user-account.reducer';
import { setFormData } from './exchange-form.reducer';
import { IRootState } from '../../../shared/reducers';
import useAccountBalance from '../../user-account/useAccountBalance';
import { getUpdatedBalancesOnExchange } from '../../../shared/utils/currency-calculations';

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
    const [firstBalanceAfterExchange, secondBalanceAfterExchange] = getUpdatedBalancesOnExchange(
      isSellActive,
      totalFirstCurrencyBalance,
      totalSecondCurrencyBalance,
      Number(formData[FormInputNames.FIRST_COMPARING_CURRENCY]),
      Number(formData[FormInputNames.SECOND_COMPARING_CURRENCY]),
    );

    dispatch(setBalanceByCurrency({
      value: firstBalanceAfterExchange,
      abbreviation: firstComparingCurrency.abbreviation,
    }));

    dispatch(setBalanceByCurrency({
      value: secondBalanceAfterExchange,
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
