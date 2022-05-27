import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        authenticated: true,
      };
    default:
      return { ...state };
  }
};
