import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "./containers/Auth/Auth";
import Exam from "./containers/Exam/Exam";
import ExamResult from "./components/ExamResult/ExamResult";
import NotFound from "./components/NotFound/NotFound";
// import { useEffect } from "react";
import * as actionCreators from "./store/actions/index";

const App = (props) => {
  const { loginUser } = props;
  useEffect(() => {
    const authenticated = localStorage.getItem("isAuthenticated");

    if (authenticated) {
      loginUser();
    }
  }, [loginUser]);

  return (
    <div className="App">
      <Routes>
        {props.isAuthenticated ? (
          <>
            <Route path="/exam" element={<Exam />} />
            <Route path="/exam-result" element={<ExamResult />} />
          </>
        ) : (
          <Route path="/login" element={<Auth />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
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
