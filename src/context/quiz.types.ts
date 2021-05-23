import React, { Dispatch } from "react";

export type Option = {
  id: string;
  text: string;
  isRight: boolean;
};

export type Question = {
  id: string;
  text: string;
  positiveMarks: number;
  negativeMarks: number;
  timeInSeconds: string;
  questionImage: string;
  options: Option[];
};

export type Quiz = {
  id: string;
  title: string;
  totalTimeInSeconds: string;
  totalScore: number;
  totalQuestions: number;
  quizImage: string;
  questions: Question[];
};

export type QuizAnswer = {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
};

export type TakenQuiz = {
  quizId: string;
  score: number;
  answers: QuizAnswer[];
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  token: string;
  takenQuizzes: TakenQuiz[];
};

export type QuizState = {
  userData: UserType;
  quizList: Quiz[];
};

export type ActionType =
  | {
      type: "SAVE_DATA_ON_SUBMIT";
      payload: {
        takenQuiz: TakenQuiz;
      };
    }
  | {
      type: "FLUSH_USER_DATA";
    };

export type ContextType = {
  state: QuizState;
  dispatch: Dispatch<ActionType>;
};

export type QuizProviderProp = {
  children: JSX.Element;
};

export type QuizCardProps = {
  id: string;
  title: string;
  totalTimeInSeconds: string;
  totalQuestions: number;
  quizImage: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
};

export type QuizStartModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  title: string;
  totalQuestions: number;
  totalTimeInSeconds: string;
  quizImage: string;
};

export type QuestionPropType = {
  question: Question;
  dispatch: React.Dispatch<AnswerActionType>;
  state: TakenQuiz;
  loadNextQuestion: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AnswerActionType =
  | {
      type: "SET_SCORE";
      payload: { score: number };
    }
  | {
      type: "SAVE_ANSWER";
      payload: {
        answer: {
          questionId: string;
          selectedOptionId: string;
          isCorrect: boolean;
        };
      };
    };

export type OptionPropType = {
  option: Option;
  callback: (id: string, isRight: boolean) => void;
  loading: boolean;
};
