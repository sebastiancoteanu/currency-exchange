import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ExchangeToggle, { Option } from './index';
import TestingComponentWrapper from '../../../shared/TestingComponentWrapper';

describe('ExchangeToggle', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(
      <TestingComponentWrapper>
        <ExchangeToggle />
      </TestingComponentWrapper>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Displays two options sell and buy', () => {
    const wrapper = mount(
      <TestingComponentWrapper>
        <ExchangeToggle />
      </TestingComponentWrapper>,
    );
    expect(wrapper.find(ExchangeToggle).find(Option).length).toBe(2);
  });

  test('Click on option and becomes active', () => {
    const { act } = renderer;
    const wrapper = mount(
      <TestingComponentWrapper>
        <ExchangeToggle />
      </TestingComponentWrapper>,
    );
    act(() => {
      wrapper.find(ExchangeToggle).find(Option).last().simulate('click');
    });
    expect(wrapper.find(ExchangeToggle).find(Option).last().props().active).toBe(true);
  });
});
