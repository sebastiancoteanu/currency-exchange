import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import lightTheme from '../theme/lightTheme';
import configureAppStore from '../config/store';

const store = configureAppStore();

const TestingComponentWrapper: FC = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      {children}
    </ThemeProvider>
  </Provider>
);

export default TestingComponentWrapper;
