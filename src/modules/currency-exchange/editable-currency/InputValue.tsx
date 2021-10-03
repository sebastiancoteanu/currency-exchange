import React, {
  ChangeEvent, FC, KeyboardEvent, useEffect,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { EXCHANGE_VALUE_REGEX } from '../../../constants';
import { setFormData } from '../exchange-form/exchange-form.reducer';
import { IRootState } from '../../../shared/reducers';
import useFormValidation from '../useFormValidation';
import { FormInputNames } from '../exchange-form/types';
import { getComputedFormData } from '../../../shared/utils/currency-calculations';

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
    firstComparingCurrency,
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

  useEffect(() => {
    dispatch(setFormData({
      [FormInputNames.FIRST_COMPARING_CURRENCY]: '0',
      [FormInputNames.SECOND_COMPARING_CURRENCY]: '0',
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstComparingCurrency.abbreviation, secondComparingCurrency.abbreviation]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!'0123456789.'.includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === '.' && e.currentTarget.value.includes('.')) {
      e.preventDefault();
    }
  };

  const updateFormData = (value: string) => {
    if (!secondComparingCurrency.rate) {
      return;
    }

    const newFormData = getComputedFormData(
      name === FormInputNames.FIRST_COMPARING_CURRENCY,
      value,
      secondComparingCurrency.rate,
    );

    dispatch(setFormData({ ...newFormData }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!EXCHANGE_VALUE_REGEX.test(e.target.value)) {
      return;
    }

    updateFormData(e.target.value);
  };

  return (
    <Input
      type="text"
      name={name}
      value={formData[name as keyof typeof formData]}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default InputValue;
