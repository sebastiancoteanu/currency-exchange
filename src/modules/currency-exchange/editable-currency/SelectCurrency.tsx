import React, { FC } from 'react';
import Select, { Options, StylesConfig } from 'react-select';
import styled from 'styled-components';
import { Currency } from '../types';

const colourStyles: StylesConfig<Currency> = {
  control: (styles) => ({
    ...styles,
    fontSize: '24px',
    border: 'none',
    minHeight: 'auto',
    boxShadow: 'none !important',
    cursor: 'pointer',

    '&:hover, &:focus': {
      border: 'none',
      boxShadow: 'none !important',
      outline: 'none',
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    margin: '0',
    color: 'inherit',
  }),
  input: (styles) => ({
    ...styles,
    margin: '0',
    padding: '0',
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    alignSelf: 'center',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: '0',
    color: 'inherit',

    '&:hover': {
      color: 'inherit',
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '0',
  }),
  menu: (styles) => ({
    ...styles,
    minWidth: '90px',
  }),
};

const SelectWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
`;

interface Props {
  options: Options<Currency>;
  currency: Currency;
  onChange: (currency: Currency) => void;
}

const SelectCurrency: FC<Props> = ({ options, currency, onChange }) => (
  <SelectWrapper>
    <Select
      onChange={(selectedCurrency) => onChange(selectedCurrency as Currency)}
      value={currency}
      options={options}
      getOptionLabel={(option) => option.abbreviation}
      getOptionValue={(option) => option.abbreviation}
      styles={colourStyles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  </SelectWrapper>
);
export default SelectCurrency;
