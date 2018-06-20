import { applyMiddleware, createStore } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import axios from 'axios';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import immutable from 'redux-immutable-state-invariant';
import logic from 'state_management/logic';
import reducer from 'state_management/reducers';
import createDebounce from 'redux-debounced';


const axiosClient = axios.create({
  responseType: 'json',
});

const axiosMiddlewareConfig = {};

const middlewares = [
  createDebounce(),
  createLogicMiddleware(logic),
  axiosMiddleware(axiosClient, axiosMiddlewareConfig),
  thunk,
];

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
  middlewares.push(immutable());
}

export default createStore(reducer, applyMiddleware(...middlewares));
