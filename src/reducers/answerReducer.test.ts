import { TakenQuiz } from "../context/quiz.types";
import { answerReducer } from "./answerReducer";

describe("Test answerReducer", () => {
  test("Should set score", () => {
    const initialState: TakenQuiz = {
      quizId: "dffdgfd",
      score: 0,
      answers: [],
    };

    const reducedState = answerReducer(initialState, {
      type: "SET_SCORE",
      payload: { score: 10 },
    });

    expect(reducedState).toEqual({
      quizId: "dffdgfd",
      score: 10,
      answers: [],
    });
  });

  test("Should save answer", () => {
    const initialState: TakenQuiz = {
      quizId: "dffdgfd",
      score: 0,
      answers: [],
    };

    const reducedState = answerReducer(initialState, {
      type: "SAVE_ANSWER",
      payload: {
        answer: {
          questionId: "emrfnuierfre",
          isCorrect: false,
          selectedOptionId: "sdfjdf3uirf",
        },
      },
    });

    expect(reducedState).toEqual({
      quizId: "dffdgfd",
      score: 0,
      answers: [
        {
          questionId: "emrfnuierfre",
          isCorrect: false,
          selectedOptionId: "sdfjdf3uirf",
        },
      ],
    });
  });
});
