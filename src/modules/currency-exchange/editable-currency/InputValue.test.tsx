import React from 'react';
import renderer from 'react-test-renderer';
import TestingComponentWrapper from '../../../shared/TestingComponentWrapper';
import InputValue from './InputValue';
import { FormInputNames } from '../exchange-form/types';

describe('InputValue', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(
      <TestingComponentWrapper>
        <InputValue name={FormInputNames.FIRST_COMPARING_CURRENCY} />
      </TestingComponentWrapper>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
