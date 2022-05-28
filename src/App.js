import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "./containers/Auth/Auth";
import Exam from "./containers/Exam/Exam";
import ExamResult from "./components/ExamResult/ExamResult";
import { useEffect } from "react";
import * as actionCreators from "./store/actions/index";

const App = (props) => {
  const { loginUser } = props;
  useEffect(() => {
    const authenticated = localStorage.getItem("isAuthenticated");

    if (authenticated) {
      loginUser();
    }
  }, [loginUser]);

  let routes;

  if (props.isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/exam" replace />} />
        <Route path="/login" element={<Navigate to="/exam" replace />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/exam-result" element={<ExamResult />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/exam" element={<Navigate to="/login" replace />} />
        <Route path="/exam-result" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  return <div className="App">{routes}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(actionCreators.loginSuccessfully()),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
