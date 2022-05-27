import * as actionTypes from "./actionTypes";

export const loginSuccessfully = () => {
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
      localStorage.setItem("isAuthenticated", "yes");
      dispatch(loginSuccessfully());
    }, 500);
  };
};
