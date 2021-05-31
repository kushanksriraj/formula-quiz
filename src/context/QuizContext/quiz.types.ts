import React, { Dispatch } from "react";

export type Option = {
  _id: string;
  text: string;
  isRight: boolean;
};

export type Question = {
  _id: string;
  text: string;
  positiveMarks: number;
  negativeMarks: number;
  timeInSeconds: string;
  questionImage: string;
  optionList: Option[];
};

export type QuizData = {
  _id: string;
  title: string;
  totalTimeInMinutes: string;
  totalScore: number;
  totalQuestions: number;
  quizImage: string;
  questionList: Question[];
};

export type Quiz = {
  _id: string;
  title: string;
  totalTimeInMinutes: string;
  totalScore: number;
  totalQuestions: number;
  quizImage: string;
};

export type QuizAnswer = {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
};

export type TakenQuiz = {
  quizId: string;
  score: number;
  answerList: QuizAnswer[];
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  token: string;
  takenQuizList: TakenQuiz[];
};

export type QuizProviderProp = {
  children: JSX.Element;
};

export type QuizCardProps = {
  id: string;
  title: string;
  totalTimeInMinutes: string;
  totalQuestions: number;
  quizImage: string;
  taken: boolean;
};

export type QuizStartModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  title: string;
  totalQuestions: number;
  totalTimeInMinutes: string;
  quizImage: string;
  taken: boolean;
};

export type QuestionPropType = {
  question: Question;
  loadNextQuestion: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type OptionPropType = {
  option: Option;
  callback: (id: string, isRight: boolean) => void;
  loading: boolean;
};

export type QuizListResponse = {
  success: boolean;
  quizzes: Quiz[];
};

export type ServerError = {
  success: false;
  message: string;
};

export type QuizActionType =
  | {
      type: "RESET_AND_SET_NEW_QUIZ_ID";
      payload: { quizId: string };
    }
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

export type QuizContextType = {
  quizList: Quiz[];
  quizLoading: boolean;
  currentQuiz: QuizData | null;
  currentQuizAnswer: TakenQuiz;
  getCurrentQuizData: (_id: string) => Promise<void>;
  quizDispatch: Dispatch<QuizActionType>;
  setQuizList: React.Dispatch<React.SetStateAction<Quiz[]>>;
  setQuizLoading: React.Dispatch<React.SetStateAction<boolean>>;
  quizError: string;
  setQuizError: React.Dispatch<React.SetStateAction<string>>;
  setCurrentQuiz: React.Dispatch<React.SetStateAction<QuizData | null>>;
};

export type CurrentQuizResponse = {
  success: boolean;
  quiz: QuizData;
};
