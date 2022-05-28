import * as actionTypes from "../actions/actionTypes";
import questions from "../../questions";
import { getRandomItem } from "../../utils/random";
import { shuffle } from "../../utils/shuffle";

const initialState = {
  questions,
  prevQuestions: [],
  currentQuestion: { id: null, question: "", answers: [], correct_answer: "" },
  studentScore: 0,
};

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_EXAM:
      return {
        ...state,
        prevQuestions: [],
        studentScore: 0,
      };
    case actionTypes.GET_QUESTION:
      const remainingQuestions = state.questions.filter(
        (question) => !state.prevQuestions.includes(question.id)
      );
      let question = getRandomItem(remainingQuestions);
      // shuffle the answers
      let updatedQuestion = {
        ...question,
        answers: shuffle([...question.answers]),
      };

      return {
        ...state,
        prevQuestions: [...state.prevQuestions, question.id],
        currentQuestion: updatedQuestion,
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
