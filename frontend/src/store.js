import { applyMiddleware, createStore, combineReducers } from 'redux';

import { promiseMiddleware, localStorageMiddleware } from './middleware';
import auth from 'reducers/auth';
import common from 'reducers/common';
import article from 'reducers/article';
import articleList from 'reducers/articleList';
import editor from 'reducers/editor';

const reducer = combineReducers({
  articleList,
  article,
  editor,
  common,
  auth,
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);
const store = createStore(reducer, middleware);

export default store;
