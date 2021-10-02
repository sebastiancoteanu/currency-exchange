import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducer, { IRootState } from '../shared/reducers';

const defaultMiddlewares = [
  thunkMiddleware,
  promiseMiddleware,
];

// eslint-disable-next-line
const composedMiddlewares = (middlewares: any[]) => compose(applyMiddleware(...defaultMiddlewares, ...middlewares),
  // eslint-disable-next-line
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

// eslint-disable-next-line
const initialize = (
  initialState?: IRootState,
  middlewares = [],
) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
