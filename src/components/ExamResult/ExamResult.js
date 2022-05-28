import { connect } from "react-redux";
import classes from "./ExamResult.module.css";

const ExamResult = (props) => (
  <div className={classes.ExamResult}>your score is: {props.studentScore}</div>
);

const mapStateToProps = (state) => {
  return {
    studentScore: state.questions.studentScore,
  };
};

export default connect(mapStateToProps, null)(ExamResult);
