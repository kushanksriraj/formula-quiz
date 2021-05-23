import { AnswerActionType, TakenQuiz } from "../context/quiz.types";

export const answerReducer = (
  state: TakenQuiz,
  action: AnswerActionType
): TakenQuiz => {
  switch (action.type) {
    case "SET_SCORE":
      return {
        ...state,
        score: action.payload.score,
      };
    case "SAVE_ANSWER":
      return {
        ...state,
        answers: state.answers.concat(action.payload.answer),
      };

    default:
      return state;
  }
};
