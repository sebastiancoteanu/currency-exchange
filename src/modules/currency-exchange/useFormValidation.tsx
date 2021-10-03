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
  const { formData, submitDisabled } = useSelector<IRootState, IRootState['exchangeForm']>(
    (state) => state.exchangeForm,
  );

  const { isSellActive } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const dispatch = useDispatch();

  const { totalFirstCurrencyBalance, totalSecondCurrencyBalance } = useAccountBalance();

  const validateForm: ReturnData['validateForm'] = () => {
    const firstInputValue = Number(formData[FormInputNames.FIRST_COMPARING_CURRENCY]);
    const secondInputValue = Number(formData[FormInputNames.SECOND_COMPARING_CURRENCY]);

    if (!firstInputValue || !secondInputValue) {
      dispatch(setFormError({ submitDisabled: true, errorMessage: '' }));
      return;
    }

    if (isSellActive && firstInputValue > totalFirstCurrencyBalance) {
      dispatch(setFormError({ submitDisabled: true, errorMessage: 'Amount exceeded' }));
      return;
    }

    if (!isSellActive && secondInputValue > totalSecondCurrencyBalance) {
      dispatch(setFormError({ submitDisabled: true, errorMessage: 'Amount exceeded' }));
      return;
    }

    if (submitDisabled) {
      dispatch(setFormError({ submitDisabled: false, errorMessage: '' }));
    }
  };

  return {
    validateForm,
  };
};

export default useFormValidation;
