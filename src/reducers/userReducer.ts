import {
  UserDataType,
  UserActionType,
} from "../context/UserDataContext/userData.types";

export const userReducer = (
  state: UserDataType,
  action: UserActionType
): UserDataType => {
  switch (action.type) {
    case "INITIALIZE_USER":
      return {
        ...action.payload.userData,
      };

    case "SAVE_QUIZ_ANSWER":
      return {
        ...state,
        takenQuizList: state.takenQuizList.concat(action.payload.takenQuiz),
      };

    case "RESET_TAKENQUIZ":
      return {
        ...state,
        takenQuizList: action.payload.takenQuizList,
      };

    case "FLUSH_DATA":
      return {
        _id: null,
        name: "",
        email: "",
        takenQuizList: [],
      };

    default:
      return state;
  }
};
