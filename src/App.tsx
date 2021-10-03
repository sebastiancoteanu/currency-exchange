import React, { FC } from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import CurrencyExchange from './modules/currency-exchange';
import lightTheme from './theme/lightTheme';
import configureAppStore from './config/store';

const store = configureAppStore();

const App: FC = () => (
  <div className="App">
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CurrencyExchange />
      </ThemeProvider>
    </Provider>
  </div>
);

export default App;
