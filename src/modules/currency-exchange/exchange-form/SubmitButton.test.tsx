import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import TestingComponentWrapper from '../../../shared/TestingComponentWrapper';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(
      <TestingComponentWrapper>
        <SubmitButton />
      </TestingComponentWrapper>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Click is not possible when button disabled', () => {
    const wrapper = mount(
      <TestingComponentWrapper>
        <SubmitButton />
      </TestingComponentWrapper>,
    );

    const mockCallBack = jest.fn();
    const button = wrapper.find('button');

    button.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0);
    expect(button.props().disabled).toBe(true);
  });
});
