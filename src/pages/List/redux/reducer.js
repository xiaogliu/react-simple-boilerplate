// export directly after import, just a pipe
import { reducer as listReducer } from '../list-redux';
import { initialState } from './initial-state';

const reducers = [listReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // handle cross-topic actions type
    default:
      newState = initialState;
      break;
  }

  // reduce
  return reducers.reduce((s, r) => r(s, action), newState);
}
