import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInputNames } from './types';

const initialState = {
  errorMessage: '',
  submitDisabled: true,
  formData: {
    [FormInputNames.FIRST_COMPARING_CURRENCY]: '0',
    [FormInputNames.SECOND_COMPARING_CURRENCY]: '0',
  },
};

export type ExchangeFormState = Readonly<typeof initialState>;

const exchangeForm = createSlice({
  name: 'exchangeForm',
  initialState,
  reducers: {
    setFormError: (state, action: PayloadAction<Pick<ExchangeFormState, 'errorMessage' | 'submitDisabled'>>) => ({
      ...state,
      ...action.payload,
    }),
    setFormData: (state, action: PayloadAction<ExchangeFormState['formData']>) => ({
      ...state,
      formData: {
        ...state.formData,
        ...action.payload,
      },
    }),
  },
});

const { actions, reducer } = exchangeForm;

export const { setFormData, setFormError } = actions;

export default reducer;
