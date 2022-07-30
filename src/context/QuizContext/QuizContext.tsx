import { createContext, useReducer, useState } from "react";
import {
  Quiz,
  QuizData,
  QuizProviderProp,
  TakenQuiz,
  QuizContextType,
} from "./quiz.types";
import { quizReducer } from "../../reducers/quizReducer";

export const initialState: TakenQuiz = {
  quizId: "",
  score: 0,
  answerList: [],
};

export const QuizContext = createContext<QuizContextType>(
  {} as QuizContextType
);

export const QuizProvider = ({ children }: QuizProviderProp): JSX.Element => {
  const [quizLoading, setQuizLoading] = useState<boolean>(true);
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [state, quizDispatch] = useReducer(quizReducer, initialState);
  const [quizError, setQuizError] = useState<string>("");

  return (
    <QuizContext.Provider
      value={{
        quizList,
        quizLoading,
        currentQuiz,
        currentQuizAnswer: state,
        quizDispatch,
        setQuizList,
        setQuizLoading,
        quizError,
        setQuizError,
        setCurrentQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
