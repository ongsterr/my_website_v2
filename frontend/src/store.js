import { applyMiddleware, createStore, combineReducers } from 'redux';

import { promiseMiddleware, localStorageMiddleware } from './middleware';
import auth from 'reducers/auth';
import common from 'reducers/common';
import article from 'reducers/article';

const reducer = combineReducers({
  article,
  common,
  auth,
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);
const store = createStore(reducer, middleware);

export default store;
