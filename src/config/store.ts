import { configureStore } from '@reduxjs/toolkit';
import reducer from '../shared/reducers';

// eslint-disable-next-line
const configureAppStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export default configureAppStore;
