import classes from "./Question.module.css";

const Question = (props) => {
  const answers = props.answers.map((answer) => (
    <article key={answer}>
      <input
        className={classes.AnswerInput}
        type="radio"
        id={answer}
        name="answer"
        value={answer}
        checked={props.studentAnswer === answer}
        onChange={(e) => props.answerChangedHandler(e)}
      />
      <label className={classes.Answer} htmlFor={answer}>
        <span dangerouslySetInnerHTML={{ __html: answer }} />
      </label>
    </article>
  ));
  return (
    <article className={classes.Question}>
      <h2 className={classes.QuestionText}>{props.question}</h2>
      <div className={classes.Answers}>{answers}</div>
    </article>
  );
};

export default Question;
