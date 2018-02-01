/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createUser from './store/reducers/createUser';

const appReducer = combineReducers({
  createUser,
});

const rootReducer = (state, action) => {
  if (action.type === 'REMOVE_USER') state = undefined;
  return appReducer(state, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
