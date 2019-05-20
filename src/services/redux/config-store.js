// middleware
import { createStore } from 'redux';
import rootReducer from './root-reducer';

export default createStore(
  rootReducer,
  // redux dev
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
