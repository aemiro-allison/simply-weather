import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas/sagas';

import rootReducer from './reducers/index';
import superagent from 'superagent';
import feathers from 'feathers-client';
import rest from 'feathers-rest/client';
import localstorage from 'feathers-localstorage';


const defaultStore = {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  defaultStore,
  applyMiddleware(sagaMiddleware)
);

// const host = 'https://simply-weather-app.herokuapp.com';
const host = 'http://localhost:3030';
export const app = feathers() 
  .configure(rest(host).superagent(superagent))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }))
  .use('locations', localstorage({ storage: window.localStorage }));

sagaMiddleware.run(mySaga, app);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;