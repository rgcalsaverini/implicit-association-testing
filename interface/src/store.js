import { applyMiddleware, createStore } from 'redux';

import axios from 'axios';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import immutable from 'redux-immutable-state-invariant';
import reducer from './reducers';


const axiosClient = axios.create({
  responseType: 'json',
});

const axiosMiddlewareConfig = {};

const middlewares = [
  axiosMiddleware(axiosClient, axiosMiddlewareConfig),
  thunk,
];

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
  middlewares.push(immutable());
}

export default createStore(reducer, applyMiddleware(...middlewares));
