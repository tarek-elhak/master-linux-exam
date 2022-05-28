import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actionCreators from "../../store/actions/index";
import Button from "../ui/Button/Button";
import classes from "./ExamResult.module.css";

const ExamResult = (props) => {
  const navigate = useNavigate();

  return (
    <div className={classes.ExamResult}>
      <Button secondary logout clicked={() => props.logout(navigate)}>
        logout
      </Button>
      {props.prevQuestions.length !== props.allQuestions.length ? (
        <p>
          You have to complete all questions in order to show your score, go
          back !
        </p>
      ) : (
        <p>your score is: {props.studentScore}</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    prevQuestions: state.questions.prevQuestions,
    allQuestions: state.questions.questions,
    studentScore: state.questions.studentScore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (navigate) => dispatch(actionCreators.logout(navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamResult);
