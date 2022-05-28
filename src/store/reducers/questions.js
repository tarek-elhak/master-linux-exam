import * as actionTypes from "../actions/actionTypes";
import questions from "../../questions";
import { getRandomItem } from "../../utils/random";

const initialState = {
  questions,
  prevQuestions: [],
  currentQuestion: { id: null, question: "", answers: [], correct_answer: "" },
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

    default: {
      return state;
    }
  }
};
