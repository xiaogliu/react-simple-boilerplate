// export directly after import, just a pipe
import { getIPInfoSucceededReducer as homeReducer } from '../home-redux';
import { reducer as eatReducer } from '../components/Eat/eat-redux';
import { initialState } from './initial-state';

const reducers = [homeReducer, eatReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // handle cross-topic actions type
    default:
      newState = state;
      break;
  }

  // reduce
  return reducers.reduce((s, r) => r(s, action), newState);
}
