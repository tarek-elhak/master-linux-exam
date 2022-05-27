import { useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../components/ui/Button/Button";
import Question from "../Exam/Question/Question";
import * as actionCreators from "../../store/actions/index";
import classes from "./Exam.module.css";

const Exam = (props) => {
  // const { getQuestion } = props;

  useEffect(
    () => {
      props.getQuestion();
    },
    [
      /*getQuestion*/
    ]
  );

  const nextQuestionHandler = (event) => {
    console.log("getting the next question !");
  };

  const showScoreHandler = (event) => {
    console.log("showing the score !");
  };

  let button = <Button clicked={nextQuestionHandler}>next one</Button>;

  if (props.prevQuestions.length === props.allQuestions.length) {
    button = (
      <Button secondary clicked={showScoreHandler}>
        show result
      </Button>
    );
  }

  return (
    <div className={classes.Exam}>
      <Question question={props.question} />
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

const mapDispatchToProps = (disptach) => {
  return {
    getQuestion: () => disptach(actionCreators.getQuestion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
