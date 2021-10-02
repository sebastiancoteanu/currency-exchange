import { useDispatch, useSelector } from 'react-redux';
import { setFormError } from './exchange-form/exchange-form.reducer';
import { IRootState } from '../../shared/reducers';
import { FormInputNames } from './exchange-form/types';
import useAccountBalance from '../user-account/useAccountBalance';

interface ReturnData {
  validateForm: () => void;
}

type Hook = () => ReturnData;

const useFormValidation: Hook = () => {
  const {
    formData,
  } = useSelector<IRootState, IRootState['exchangeForm']>(
    (state) => state.exchangeForm,
  );

  const dispatch = useDispatch();

  const {
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const { totalFirstCurrencyBalance } = useAccountBalance();

  const validateForm: ReturnData['validateForm'] = () => {
    const exchangeRate = secondComparingCurrency.rate as number;
    const firstInputValue = Number(formData[FormInputNames.FIRST_COMPARING_CURRENCY]);

    if (!firstInputValue) {
      dispatch(setFormError({ submitDisabled: true }));
      return;
    }

    if (exchangeRate * firstInputValue > totalFirstCurrencyBalance) {
      dispatch(setFormError({ submitDisabled: true, errorMessage: 'Amount exceeded' }));
    }
  };

  return {
    validateForm,
  };
};

export default useFormValidation;
