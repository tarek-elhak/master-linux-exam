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

export const sendLoginRequest = (navigate) => {
  return (dispatch) => {
    dispatch(startLoading());
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "yes");
      dispatch(loginSuccessfully());
      navigate("/exam");
    }, 500);
  };
};

export const logout = (navigate) => {
  localStorage.removeItem("isAuthenticated");
  navigate("/login");
  return {
    type: actionTypes.LOGOUT,
  };
};
