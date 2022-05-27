import * as actionTypes from "../actions/actionTypes";
import questions from "../../questions";
import { getRandomItem } from "../../utils/random";

const initialState = {
  questions,
  prevQuestions: [],
  currentQuestion: {},
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
        currentQuestion: { question },
      };

    default: {
      return state;
    }
  }
};
