import { UserDataType } from "../context/UserDataContext/userData.types";
import { userReducer } from "./userReducer";

describe("Test answerReducer", () => {
  test("Should initialize user data", () => {
    const initialState: UserDataType = {
      _id: "",
      name: "",
      email: "",
      takenQuizList: [],
    };

    const reducedState = userReducer(initialState, {
      type: "INITIALIZE_USER",
      payload: {
        userData: {
          _id: "njkrtretrnkfdif",
          name: "Kushank",
          email: "kushank@mail.com",
          takenQuizList: [],
        },
      },
    });

    expect(reducedState).toEqual({
      _id: "njkrtretrnkfdif",
      name: "Kushank",
      email: "kushank@mail.com",
      takenQuizList: [],
    });
  });

  test("Should save quiz answer", () => {
    const initialState: UserDataType = {
      _id: "njkrtretrnkfdif",
      name: "Kushank",
      email: "kushank@mail.com",
      takenQuizList: [],
    };

    const reducedState = userReducer(initialState, {
      type: "SAVE_QUIZ_ANSWER",
      payload: {
        takenQuiz: {
          quizId: "some_unique_quiz_id",
          score: 30,
          answerList: [
            {
              questionId: "question__1",
              selectedOptionId: "option__2",
              isCorrect: false,
            },
            {
              questionId: "question__2",
              selectedOptionId: "option__1",
              isCorrect: true,
            },
          ],
        },
      },
    });

    expect(reducedState).toEqual({
      _id: "njkrtretrnkfdif",
      name: "Kushank",
      email: "kushank@mail.com",
      takenQuizList: [
        {
          quizId: "some_unique_quiz_id",
          score: 30,
          answerList: [
            {
              questionId: "question__1",
              selectedOptionId: "option__2",
              isCorrect: false,
            },
            {
              questionId: "question__2",
              selectedOptionId: "option__1",
              isCorrect: true,
            },
          ],
        },
      ],
    });
  });

  test("Should reset takenQuizList", () => {
    const initialState: UserDataType = {
      _id: "njkrtretrnkfdif",
      name: "Kushank",
      email: "kushank@mail.com",
      takenQuizList: [
        {
          quizId: "some_unique_quiz_id",
          score: 30,
          answerList: [
            {
              questionId: "question__1",
              selectedOptionId: "option__2",
              isCorrect: false,
            },
            {
              questionId: "question__2",
              selectedOptionId: "option__1",
              isCorrect: true,
            },
          ],
        },
      ],
    };

    const reducedState = userReducer(initialState, {
      type: "RESET_TAKENQUIZ",
      payload: {
        takenQuizList: [],
      },
    });

    expect(reducedState).toEqual({
      _id: "njkrtretrnkfdif",
      name: "Kushank",
      email: "kushank@mail.com",
      takenQuizList: [],
    });
  });

  test("Should clear all user data", () => {
    const initialState: UserDataType = {
      _id: "njkrtretrnkfdif",
      name: "Kushank",
      email: "kushank@mail.com",
      takenQuizList: [
        {
          quizId: "some_unique_quiz_id",
          score: 30,
          answerList: [
            {
              questionId: "question__1",
              selectedOptionId: "option__2",
              isCorrect: false,
            },
            {
              questionId: "question__2",
              selectedOptionId: "option__1",
              isCorrect: true,
            },
          ],
        },
      ],
    };

    const reducedState = userReducer(initialState, {
      type: "FLUSH_DATA",
    });

    expect(reducedState).toEqual({
      _id: null,
      name: "",
      email: "",
      takenQuizList: [],
    });
  });
});
