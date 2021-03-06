import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import Question from "../Exam/Question/Question";
import * as actionCreators from "../../store/actions/index";
import classes from "./Exam.module.css";

const Exam = (props) => {
  const [studentAnswer, setStudentAnswer] = useState("");
  const navigate = useNavigate();

  const { resetExam, getQuestion } = props;
  const answerChangedHandler = (event) => {
    setStudentAnswer(event.target.value);
  };

  useEffect(() => {
    resetExam();
    getQuestion();
  }, [resetExam, getQuestion]);

  const logoutHandler = () => {
    props.logout(navigate);
  };

  const nextQuestionHandler = (event) => {
    props.saveAnswer(props.question.id, studentAnswer);
    props.getQuestion();
  };

  const showScoreHandler = (event) => {
    props.saveAnswer(props.question.id, studentAnswer);
    props.calcScore();
    navigate("/exam-result", { replace: true });
  };

  let button = (
    <Button
      secondary
      next
      clicked={nextQuestionHandler}
      disabled={!props.question.answers.includes(studentAnswer)}
    >
      next one
    </Button>
  );

  if (props.prevQuestions.length === props.allQuestions.length) {
    button = (
      <Button
        secondary
        result
        clicked={showScoreHandler}
        disabled={!props.question.answers.includes(studentAnswer)}
      >
        show result
      </Button>
    );
  }

  return (
    <div className={classes.Exam}>
      <Button secondary logout clicked={logoutHandler}>
        logout
      </Button>
      <Question
        {...props.question}
        studentAnswer={studentAnswer}
        answerChangedHandler={answerChangedHandler}
      />
      {button}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allQuestions: state.questions.questions,
    prevQuestions: state.questions.prevQuestions,
    question: state.questions.currentQuestion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetExam: () => dispatch(actionCreators.resetExam()),
    getQuestion: () => dispatch(actionCreators.getQuestion()),
    saveAnswer: (id, answer) =>
      dispatch(actionCreators.saveStudentAnswer(id, answer)),
    calcScore: () => dispatch(actionCreators.calculateStudentScore()),
    logout: (navigate) => dispatch(actionCreators.logout(navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
