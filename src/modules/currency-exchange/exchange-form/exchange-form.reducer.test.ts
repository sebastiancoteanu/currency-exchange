import reducer, { ExchangeFormState, setFormData, setFormError } from './exchange-form.reducer';
import { FormInputNames } from './types';

describe('ExchangeFormReducer', () => {
  let previousState = {} as ExchangeFormState;

  beforeEach(() => {
    previousState = {
      errorMessage: '',
      submitDisabled: false,
      formData: {
        [FormInputNames.FIRST_COMPARING_CURRENCY]: '100',
        [FormInputNames.SECOND_COMPARING_CURRENCY]: '200',
      },
    };
  });

  describe('GetInitialState', () => {
    test('Is initial empty', () => {
      expect(reducer(undefined, { type: '' })).toEqual({
        errorMessage: '',
        submitDisabled: true,
        formData: {
          [FormInputNames.FIRST_COMPARING_CURRENCY]: '0',
          [FormInputNames.SECOND_COMPARING_CURRENCY]: '0',
        },
      });
    });
  });

  describe('SetFormData', () => {
    const newFormData = {
      [FormInputNames.FIRST_COMPARING_CURRENCY]: '100',
      [FormInputNames.SECOND_COMPARING_CURRENCY]: '1000',
    };

    test('Sets form data', () => {
      expect(reducer(previousState, setFormData(newFormData))).toEqual({
        ...previousState,
        formData: newFormData,
      });
    });
  });

  describe('SetFormError', () => {
    const errorPayload: Pick<ExchangeFormState, 'errorMessage' | 'submitDisabled'> = {
      submitDisabled: true,
      errorMessage: 'Error',
    };

    test('Sets form data', () => {
      expect(reducer(previousState, setFormError(errorPayload))).toEqual({
        ...previousState,
        ...errorPayload,
      });
    });
  });
});
