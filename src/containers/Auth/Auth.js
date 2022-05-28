import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actionCreators from "../../store/actions/index";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import classes from "./Auth.module.css";

const Auth = (props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: {
      value: "",
      rules: { required: true, min: 3 },
      error: "",
      hasError: true,
      touched: false,
    },
    email: {
      value: "",
      rules: { required: true, email: true, error: "" },
      error: "",
      hasError: true,
      touched: false,
    },
    password: {
      value: "",
      rules: {
        required: true,
        min: 8,
        includes: { number: true, uppercase: true },
      },
      error: "",
      hasError: true,
      touched: false,
    },
  });

  const [formValid, setFormValid] = useState(false);

  const validateForm = (type, value) => {
    let error = false;
    let errorMessage = "";

    if (input[type].rules.required) {
      if (value.trim().length === 0) {
        error = true;
        errorMessage = `${type} mustn't be empty`;
      }
    }
    if (!error && input[type].rules.min) {
      if (value.trim().length < input[type].rules.min) {
        error = true;
        errorMessage = `${type} must be at least ${input[type].rules.min} characters`;
      }
    }
    if (!error && input[type].rules.email) {
      if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        error = true;
        errorMessage = `You must enter a valid ${type} address`;
      }
    }
    if (!error && input[type].rules.includes?.number) {
      if (!value.match(/\d/)) {
        error = true;
        errorMessage = `${type} must contains at least 1 number`;
      }
    }

    if (!error && input[type].rules.includes?.uppercase) {
      if (!value.match(/[A-Z]/)) {
        error = true;
        errorMessage = `${type} must contains at least 1 uppercase letter`;
      }
    }

    return { error, errorMessage };
  };

  const inputChangedHandler = (event) => {
    const { error, errorMessage } = validateForm(
      event.target.name,
      event.target.value
    );
    const updatedInput = { ...input };
    updatedInput[event.target.name] = {
      ...input[event.target.name],
      error: error ? errorMessage : "",
      hasError: error ? true : false,
      value: event.target.value,
      touched: true,
    };
    setInput(updatedInput);

    // check if the overall form inputs are valid or not
    let formValidity = true;

    for (let field in updatedInput) {
      if (updatedInput[field].hasError) {
        formValidity = false;
      }
    }

    setFormValid(formValidity);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    props.loginUser(navigate);
  };

  return (
    <form onSubmit={authSubmitHandler} className={classes.LoginForm}>
      <div className={classes.Input}>
        <input
          placeholder="Name"
          type="text"
          name="name"
          value={input.name.value}
          onChange={inputChangedHandler}
        />

        {input.name.hasError && input.name.touched ? (
          <p className={classes.Error}>{input.name.error}</p>
        ) : null}
      </div>

      <div className={classes.Input}>
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={input.email.value}
          onChange={inputChangedHandler}
        />

        {input.email.hasError && input.email.touched ? (
          <p className={classes.Error}>{input.email.error}</p>
        ) : null}
      </div>

      <div className={classes.Input}>
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={input.password.value}
          onChange={inputChangedHandler}
        />

        {input.password.hasError && input.password.touched ? (
          <p className={classes.Error}>{input.password.error}</p>
        ) : null}
      </div>

      <Button primary login disabled={!formValid}>
        login
      </Button>
      {props.isLoading && <Spinner />}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
    isAuthenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (navigate) =>
      dispatch(actionCreators.sendLoginRequest(navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
