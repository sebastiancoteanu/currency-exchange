import { BaseAction } from '../../../shared/reducers/types';
import { FormInputNames } from './types';

export const ACTION_TYPES = {
  SET_FORM_ERROR: 'currencyExchangeForm/SET_FORM_ERROR',
  SET_FORM_DATA: 'currencyExchangeForm/SET_FORM_DATA',
};

const initialState = {
  errorMessage: '',
  submitDisabled: true,
  formData: {
    [FormInputNames.FIRST_COMPARING_CURRENCY]: '0',
    [FormInputNames.SECOND_COMPARING_CURRENCY]: '0',
  },
};

export type ExchangeFormState = Readonly<typeof initialState>;

// eslint-disable-next-line
export default (state: ExchangeFormState = initialState, action: any): ExchangeFormState => {
  switch (action.type) {
    case ACTION_TYPES.SET_FORM_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPES.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const setFormError: BaseAction<Partial<ExchangeFormState>> = (formError) => ({
  type: ACTION_TYPES.SET_FORM_ERROR,
  payload: formError,
});

export const setFormData: BaseAction<Partial<ExchangeFormState['formData']>> = (values) => ({
  type: ACTION_TYPES.SET_FORM_DATA,
  payload: values,
});
