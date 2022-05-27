import classes from "./Button.module.css";

const Button = (props) => {
  const classNames = [
    classes.Button,
    props.primary ? classes.Primary : classes.Secondary,
    props.login && classes.Login,
  ];
  return (
    <button
      className={classNames.join(" ")}
      disabled={props.disabled}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
