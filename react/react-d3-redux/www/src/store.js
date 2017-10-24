import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers.js';

export const configureStore = function (initData) {
  let middleware = applyMiddleware(thunk);
  const store = createStore(reducers, initData, middleware);
  return store;
};