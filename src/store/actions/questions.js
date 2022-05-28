import * as actionTypes from "./actionTypes";

export const getQuestion = () => {
  return {
    type: actionTypes.GET_QUESTION,
  };
};

export const saveStudentAnswer = (questionId, studentAnswer) => {
  return {
    type: actionTypes.SAVE_STUDENT_ANSWER,
    questionId,
    studentAnswer,
  };
};
