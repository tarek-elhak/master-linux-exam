import classes from "./Button.module.css";

const Button = (props) => {
  const classNames = [
    classes.Button,
    props.primary ? classes.Primary : classes.Secondary,
  ];
  return (
    <button className={classNames.join(" ")} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
