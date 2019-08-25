/*
 * src/store.js
 * With initialState
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from './reducers/rootReducer';
import createSocketMiddleware from './socketMiddleware';

const baseUrl = 'http://localhost:3000/';

const client = axios.create({
  baseURL: baseUrl,
  responseType: 'json'
});

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        axiosMiddleware(client),
        createSocketMiddleware(baseUrl)
      )
    )
  );
}
