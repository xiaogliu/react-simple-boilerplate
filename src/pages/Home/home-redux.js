// this one group, eazy develop and maintain
const HOME_SEND_FIRST_DATA = 'home_send_first_data';

export const setHomeAction = exampleData => {
  return {
    type: HOME_SEND_FIRST_DATA,
    exampleData,
  };
};
// just name reducer fn to reducer, need not add pre-name
// any actions will be received by reducers
export const reducer = (state, action) => {
  switch (action.type) {
    case HOME_SEND_FIRST_DATA:
      return {
        ...state,
        homeReduxData: action.exampleData,
      };
    default:
      return state;
  }
};

// this is other one if has
