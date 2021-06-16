import { TakenQuiz } from "../context/QuizContext/quiz.types";
import { quizReducer } from "./quizReducer";

describe("Test Quiz Reducer", () => {

  test("Should reset state and set new quiz id", () => {
    const initialState: TakenQuiz = {
      score: 30,
      answerList: [
        {
          questionId: "454cbcbb45b65342erwb",
          selectedOptionId: "454cwerwerwer90c0b",
          isCorrect: true,
        },
      ],
      quizId: "454cbcbb45b65490c0b",
    };

    const reducedState = quizReducer(initialState, {
      type: "RESET_AND_SET_NEW_QUIZ_ID",
      payload: {
        quizId: "new_quiz_id",
      },
    });

    expect(reducedState).toEqual({
      score: 0,
      answerList: [],
      quizId: "new_quiz_id",
    });
  });

  test("Should set score", () => {
    const initialState: TakenQuiz = {
      score: 10,
      answerList: [
        {
          questionId: "454cbcbb45b65342erwb",
          selectedOptionId: "454cwerwerwer90c0b",
          isCorrect: true,
        },
      ],
      quizId: "454cbcbb45b65490c0b",
    };

    const reducedState = quizReducer(initialState, {
      type: "SET_SCORE",
      payload: {
        score: 20,
      },
    });

    expect(reducedState).toEqual({
      score: 20,
      answerList: [
        {
          questionId: "454cbcbb45b65342erwb",
          selectedOptionId: "454cwerwerwer90c0b",
          isCorrect: true,
        },
      ],
      quizId: "454cbcbb45b65490c0b",
    });
  });
  
  test("Should save answers", () => {
    const initialState: TakenQuiz = {
      score: 20,
      answerList: [
        {
          questionId: "454cbcbb45b65342erwb",
          selectedOptionId: "454cwerwerwer90c0b",
          isCorrect: true,
        },
      ],
      quizId: "454cbcbb45b65490c0b",
    };

    const reducedState = quizReducer(initialState, {
      type: "SAVE_ANSWER",
      payload: {
        answer: {
          questionId: "666bcbb45b65342erwb",
          selectedOptionId: "9994cwerwerwer90c0b",
          isCorrect: false,
        },
      },
    });

    expect(reducedState).toEqual({
      score: 20,
      answerList: [
        {
          questionId: "454cbcbb45b65342erwb",
          selectedOptionId: "454cwerwerwer90c0b",
          isCorrect: true,
        },
        {
          questionId: "666bcbb45b65342erwb",
          selectedOptionId: "9994cwerwerwer90c0b",
          isCorrect: false,
        },
      ],
      quizId: "454cbcbb45b65490c0b",
    });
  });
});
