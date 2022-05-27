import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import classes from "./Auth.module.css";

const Auth = (props) => {
  const [name, setName] = useState({
    value: "",
    rules: { required: true, min: 3 },
    error: "",
    touched: false,
  });
  const [email, setEmail] = useState({
    value: "",
    rules: { required: true, type: "email", error: "" },
    error: "",
    touched: false,
  });
  const [password, setPassword] = useState({
    value: "",
    rules: {
      required: true,
      min: 8,
      includes: { number: true, uppercase: true },
    },
    error: "",
    touched: false,
  });

  const [hasError, setHasError] = useState(true);
  useEffect(() => {
    if (
      name.touched &&
      !name.error &&
      email.touched &&
      !email.error &&
      password.touched &&
      !password.error
    ) {
      setHasError(false);
    }
  }, [
    name.touched,
    name.error,
    email.touched,
    email.error,
    password.touched,
    password.error,
  ]);

  const validateName = (value) => {
    let error = false;
    let errorMessage = "";

    if (name.rules.required) {
      if (value.trim().length === 0) {
        error = true;
        errorMessage = "Name mustn't be empty";
      }
    }
    if (!error && name.rules.min) {
      if (value.trim().length < name.rules.min) {
        error = true;
        errorMessage = `Name must be at least ${name.rules.min} characters`;
      }
    }
    return { error, errorMessage };
  };

  const validateEmail = (value) => {
    let error = false;
    let errorMessage = "";

    if (email.rules.required) {
      if (value.trim().length === 0) {
        error = true;
        errorMessage = "Email mustn't be empty";
      }
    }
    if (!error && email.rules.type === "email") {
      if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        error = true;
        errorMessage = "You must enter a valid email address";
      }
    }
    return { error, errorMessage };
  };

  const validatePassword = (value) => {
    let error = false;
    let errorMessage = "";

    if (password.rules.required) {
      if (value.trim().length === 0) {
        error = true;
        errorMessage = "Password mustn't be empty";
      }
    }
    if (!error && password.rules.min) {
      if (value.trim().length < password.rules.min) {
        error = true;
        errorMessage = `Password must be at least ${password.rules.min} characters`;
      }
    }

    if (!error && password.rules.includes.number) {
      if (!value.match(/\d/)) {
        error = true;
        errorMessage = "password must contains at least 1 number";
      }
    }

    if (!error && password.rules.includes.uppercase) {
      if (!value.match(/[A-Z]/)) {
        error = true;
        errorMessage = "password must contains at least 1 uppercase letter";
      }
    }

    return { error, errorMessage };
  };

  const nameChangedHandler = (event) => {
    const { error, errorMessage } = validateName(event.target.value);
    if (error) {
      setName((prevName) => ({
        ...prevName,
        error: errorMessage,
        value: event.target.value,
        touched: true,
      }));
    } else {
      setName((prevName) => ({
        ...prevName,
        error: "",
        value: event.target.value,
        touched: true,
      }));
    }
  };
  const emailChangedHandler = (event) => {
    const { error, errorMessage } = validateEmail(event.target.value);
    if (error) {
      setEmail((prevName) => ({
        ...prevName,
        error: errorMessage,
        value: event.target.value,
        touched: true,
      }));
    } else {
      setEmail((prevName) => ({
        ...prevName,
        error: "",
        value: event.target.value,
        touched: true,
      }));
    }
  };
  const passwordChangedHandler = (event) => {
    const { error, errorMessage } = validatePassword(event.target.value);
    if (error) {
      setPassword((prevName) => ({
        ...prevName,
        error: errorMessage,
        value: event.target.value,
        touched: true,
      }));
    } else {
      setPassword((prevName) => ({
        ...prevName,
        error: "",
        value: event.target.value,
        touched: true,
      }));
    }
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    props.loginUser();
  };

  return (
    <form onSubmit={authSubmitHandler} className={classes.LoginForm}>
      <div className={classes.Input}>
        <input
          placeholder="Name"
          type="text"
          value={name.value}
          onChange={nameChangedHandler}
        />

        {name.error.length !== 0 ? (
          <p className={classes.Error}>{name.error}</p>
        ) : null}
      </div>

      <div className={classes.Input}>
        <input
          placeholder="Email"
          type="email"
          value={email.value}
          onChange={emailChangedHandler}
        />

        {email.error.length !== 0 ? (
          <p className={classes.Error}>{email.error}</p>
        ) : null}
      </div>

      <div className={classes.Input}>
        <input
          placeholder="Password"
          type="password"
          value={password.value}
          onChange={passwordChangedHandler}
        />

        {password.error.length !== 0 ? (
          <p className={classes.Error}>{password.error}</p>
        ) : null}
      </div>

      <Button primary disabled={hasError}>
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
    loginUser: () => dispatch(actionCreators.sendLoginRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
