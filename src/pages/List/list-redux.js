// this one group, eazy develop and maintain
const LIST_SEND_FIRST_DATA = 'LIST_SEND_FIRST_DATA';

export const setListAction = exampleData => {
  return {
    type: LIST_SEND_FIRST_DATA,
    exampleData,
  };
};
// just name reducer fn to reducer, need not add pre-name
// any actions will be received by reducers
export const reducer = (state, action) => {
  switch (action.type) {
    case LIST_SEND_FIRST_DATA:
      return {
        ...state,
        listReduxData: action.exampleData,
      };
    default:
      return state;
  }
};

// this is other one if has
