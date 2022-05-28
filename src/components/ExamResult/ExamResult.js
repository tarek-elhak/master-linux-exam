import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Button from "../ui/Button/Button";
import classes from "./ExamResult.module.css";

const ExamResult = (props) => (
  <div className={classes.ExamResult}>
    <Button secondary logout clicked={() => props.logout()}>
      logout
    </Button>
    <p>your score is: {props.studentScore}</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    studentScore: state.questions.studentScore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamResult);
