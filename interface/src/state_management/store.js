import { applyMiddleware, createStore } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import axios from 'axios';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import immutable from 'redux-immutable-state-invariant';
import logic from 'state_management/logic';
import reducer from 'state_management/reducers';
import { resizeWindow } from 'state_management/actions/ui';
import createDebounce from 'redux-debounced';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const interceptError = (_, error) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      document.location.pathname = 'login';
    }
  }
  return Promise.reject(error);
};

const axiosClient = axios.create({
  responseType: 'json',
});

const axiosMiddlewareConfig = {
  interceptors: { response: [{ error: interceptError }] },
};

const middlewares = [
  createDebounce(),
  createLogicMiddleware(logic),
  axiosMiddleware(axiosClient, axiosMiddlewareConfig),
  thunk,
];

if (isDev) {
  middlewares.push(createLogger());
  middlewares.push(immutable());
}

const store = createStore(reducer, applyMiddleware(...middlewares));

if (isDev) {
  window.store = store;
}

window.onresize = () => store.dispatch(resizeWindow());
export default store;
