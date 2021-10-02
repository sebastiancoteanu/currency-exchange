import React, {
  ChangeEvent, FC, KeyboardEvent, useEffect,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { EXCHANGE_VALUE_REGEX } from '../../../constants';
import { ExchangeFormState, setFormData, setFormError } from '../exchange-form/exchange-form.reducer';
import { IRootState } from '../../../shared/reducers';
import useFormValidation from '../useFormValidation';
import { FormInputNames } from '../exchange-form/types';

const Input = styled.input`
  flex: 1;
  width: 100%;
  border: none;
  font-size: 18px;
  padding-left: 16px;
  margin-left: auto;
  text-align: right;
  font-family: 'nunito', sans-serif;
  
  &:focus {
    outline: none;
  }
`;

interface Props {
  name: string;
}

const InputValue: FC<Props> = ({ name }) => {
  const {
    formData,
  } = useSelector<IRootState, IRootState['exchangeForm']>(
    (state) => state.exchangeForm,
  );

  const {
    secondComparingCurrency,
  } = useSelector<IRootState, IRootState['currencyExchange']>(
    (state) => state.currencyExchange,
  );

  const { validateForm } = useFormValidation();

  const dispatch = useDispatch();

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!'0123456789.'.includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === '.' && e.currentTarget.value.includes('.')) {
      e.preventDefault();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!EXCHANGE_VALUE_REGEX.test(e.target.value)) {
      return;
    }

    const newFormData = {
      [e.target.name]: e.target.value,
    } as Partial<ExchangeFormState['formData']>;

    if (e.target.name === FormInputNames.FIRST_COMPARING_CURRENCY) {
      newFormData.secondComparingCurrencyValue = String(+(+(e.target.value)
        / (secondComparingCurrency.rate as number)).toFixed(2));
    } else {
      newFormData.firstComparingCurrencyValue = String(+(+(e.target.value)
        * (secondComparingCurrency.rate as number)).toFixed(2));
    }

    dispatch(setFormError({ submitDisabled: false, errorMessage: '' }));
    dispatch(setFormData({ ...newFormData }));
  };

  return (
    <Input
      type="text"
      name={name}
      value={formData[name as keyof typeof formData]}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
    />
  );
};

export default InputValue;
