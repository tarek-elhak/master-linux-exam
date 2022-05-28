import * as actionTypes from "../actions/actionTypes";
import questions from "../../questions";
import { getRandomItem } from "../../utils/random";

const initialState = {
  questions,
  prevQuestions: [],
  currentQuestion: { id: null, question: "", answers: [], correct_answer: "" },
  studentScore: 0,
};

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTION:
      const remainingQuestions = state.questions.filter(
        (question) => !state.prevQuestions.includes(question.id)
      );
      let question = getRandomItem(remainingQuestions);
      return {
        ...state,
        prevQuestions: [...state.prevQuestions, question.id],
        currentQuestion: { ...question },
      };

    case actionTypes.SAVE_STUDENT_ANSWER:
      const updatedQuestions = state.questions.map((question) => {
        if (question.id === action.questionId) {
          return { ...question, student_answer: action.studentAnswer };
        }
        return question;
      });

      return {
        ...state,
        questions: updatedQuestions,
      };

    case actionTypes.CALCULATE_STUDENT_SCORE:
      let score = 0;
      state.questions.forEach(
        (question) =>
          question.correct_answer === question.student_answer && score++
      );
      const scorePercentage =
        Math.round((score / state.questions.length) * 100) + "%";
      return {
        ...state,
        studentScore: scorePercentage,
      };
    default: {
      return state;
    }
  }
};
