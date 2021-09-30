import React, { FC } from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import CurrencyExchange from './modules/currency-exchange';
import lightTheme from './theme/lightTheme';

const App: FC = () => (
  <div className="App">
    <ThemeProvider theme={lightTheme}>
      <CurrencyExchange />
    </ThemeProvider>
  </div>
);

export default App;
