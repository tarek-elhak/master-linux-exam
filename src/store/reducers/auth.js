import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  authenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SUCCESSFULL_LOGIN:
      return {
        loading: false,
        authenticated: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return { ...state };
  }
};
