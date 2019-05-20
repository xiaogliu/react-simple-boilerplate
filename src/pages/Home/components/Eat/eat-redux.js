// this one group, eazy develop and maintain
const EAT_SEND_FIRST_DATA = 'EAT_SEND_FIRST_DATA';
export const setEatAction = exampleData => {
  return {
    type: EAT_SEND_FIRST_DATA,
    exampleData,
  };
};
export const reducer = (state, action) => {
  switch (action.type) {
    case EAT_SEND_FIRST_DATA:
      return {
        ...state,
        eatReduxData: action.exampleData,
      };
    default:
      return state;
  }
};
