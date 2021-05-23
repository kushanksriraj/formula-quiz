import { QuizState, ActionType } from "../context/quiz.types";

export const quizReducer = (
  state: QuizState,
  action: ActionType
): QuizState => {
  switch (action.type) {
    case "SAVE_DATA_ON_SUBMIT":
      return {
        ...state,
        userData: {
          ...state.userData,
          takenQuizzes: state.userData.takenQuizzes.concat(
            action.payload.takenQuiz
          ),
        },
      };

    case "FLUSH_USER_DATA":
      return {
        ...state,
        userData: {
          id: "",
          name: "",
          email: "",
          token: "",
          takenQuizzes: [],
        },
      };
    default:
      return state;
  }
};
