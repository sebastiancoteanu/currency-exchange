import React, {
  ChangeEvent, FC, KeyboardEvent, useState,
} from 'react';
import styled from 'styled-components';
import { EXCHANGE_VALUE_REGEX } from '../../../constants';

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
  value: string;
  name: string;
}

const InputValue: FC<Props> = ({ name, value }) => {
  const [inputValue, setValue] = useState(value || '0');

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
    if (EXCHANGE_VALUE_REGEX.test(e.target.value)) {
      setValue(e.target.value);
    }
  };

  return (
    <Input
      type="text"
      name={name}
      value={inputValue}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
    />
  );
};

export default InputValue;
