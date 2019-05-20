import { combineReducers } from 'redux';
import homeReducer from '../../pages/Home/redux/reducer';
import listReducer from '../../pages/List/redux/reducer';

const reducerMap = {
  // this is state property, initial state in different store is isolate
  home: homeReducer,
  list: listReducer,
};

// root reducer
export default combineReducers(reducerMap);
