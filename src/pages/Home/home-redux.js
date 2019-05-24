// this one group, eazy develop and maintain
const HOME_GET_IP_INFO_START = 'HOME_GET_IP_INFO_START';

export const getIPInfoStart = exampleData => {
  return {
    type: HOME_GET_IP_INFO_START,
  };
};

// this one group, eazy develop and maintain
const HOME_GET_IP_INFO_SUCCEEDED = 'HOME_GET_IP_INFO_SUCCEEDED';
export const getIPInfoSucceeded = response => {
  return {
    type: HOME_GET_IP_INFO_SUCCEEDED,
    response,
  };
};
// just name reducer fn to reducer, need not add pre-name
// any actions will be received by reducers
export const getIPInfoSucceededReducer = (state, action) => {
  switch (action.type) {
    case HOME_GET_IP_INFO_SUCCEEDED:
      return {
        ...state,
        IPInfo: action.response,
      };
    default:
      return state;
  }
};

// this one group, eazy develop and maintain
// const HOME_GET_IP_INFO_FAILED = 'HOME_GET_IP_INFO_FAILED';
// export const getIPInfoFailed = error => {
//   return {
//     type: HOME_GET_IP_INFO_FAILED,
//     error,
//   };
// };
// // just name reducer fn to reducer, need not add pre-name
// // any actions will be received by reducers
// export const getIPInfoFailedReducer = (state, action) => {
//   switch (action.type) {
//     case HOME_GET_IP_INFO_FAILED:
//       return {
//         ...state,
//         IPInfo: action.error,
//       };
//     default:
//       return state;
//   }
// };
