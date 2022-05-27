import * as actionTypes from "./actionTypes";

const loginSuccessfully = () => {
  return {
    type: actionTypes.SUCCESSFULL_LOGIN,
  };
};

const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const sendLoginRequest = () => {
  return (dispatch) => {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(loginSuccessfully());
    }, 500);
  };
};
