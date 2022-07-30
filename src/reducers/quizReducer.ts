import { TakenQuiz, QuizActionType } from "../context/QuizContext/quiz.types";

export const quizReducer = (
  state: TakenQuiz,
  action: QuizActionType
): TakenQuiz => {
  switch (action.type) {
    case "RESET_AND_SET_NEW_QUIZ_ID":
      return {
        score: 0,
        answerList: [],
        quizId: action.payload.quizId,
      };

    case "SET_SCORE":
      return {
        ...state,
        score: action.payload.score,
      };
    case "SAVE_ANSWER":
      return {
        ...state,
        answerList: state.answerList.concat(action.payload.answer),
      };

    default:
      return state;
  }
};
