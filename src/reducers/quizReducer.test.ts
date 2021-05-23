import { QuizState } from "../context/quiz.types";
import { quizReducer } from "./quizReducer";

describe("Test Quiz Reducer", () => {
  test("Should save data on submit", () => {
    const initialState: QuizState = {
      userData: {
        id: "",
        name: "",
        email: "",
        token: "",
        takenQuizzes: [],
      },
      quizList: [],
    };

    const reducedState = quizReducer(initialState, {
      type: "SAVE_DATA_ON_SUBMIT",
      payload: {
        takenQuiz: {
          quizId: "34bsfusyf32",
          score: 20,
          answers: [
            {
              questionId: "sdf4rfrfd",
              isCorrect: true,
              selectedOptionId: "fg4fd",
            },
          ],
        },
      },
    });

    expect(reducedState).toEqual({
      userData: {
        id: "",
        name: "",
        email: "",
        token: "",
        takenQuizzes: [
          {
            quizId: "34bsfusyf32",
            score: 20,
            answers: [
              {
                questionId: "sdf4rfrfd",
                isCorrect: true,
                selectedOptionId: "fg4fd",
              },
            ],
          },
        ],
      },
      quizList: [],
    });
  });
  test("Should clear userData", () => {
    const initialState: QuizState = {
      userData: {
        id: "vmnfruiefnd",
        name: "Kushank",
        email: "kushank@gmail.com",
        token: "dsjkfb34rfiewuhfe",
        takenQuizzes: [],
      },
      quizList: [],
    };

    const reducedState = quizReducer(initialState, {
      type: "FLUSH_USER_DATA",
    });

    expect(reducedState).toEqual({
      userData: {
        id: "",
        name: "",
        email: "",
        token: "",
        takenQuizzes: [],
      },
      quizList: [],
    });
  });
});
