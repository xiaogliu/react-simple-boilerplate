// middleware
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// integrate redux-dev and middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
);

const store = createStore(
  rootReducer,
  // redux dev
  enhancer
);

// then run the saga
sagaMiddleware.run(rootSaga);
export default store;
