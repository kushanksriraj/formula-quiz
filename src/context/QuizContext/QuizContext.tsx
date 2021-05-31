import { createContext, useReducer, useState } from "react";
import { ServerError } from "../UserDataContext/userData.types";
import {
  Quiz,
  QuizData,
  QuizProviderProp,
  TakenQuiz,
  QuizContextType,
  CurrentQuizResponse,
} from "./quiz.types";
import axios, { AxiosError } from "axios";
import { quizReducer } from "../../reducers/quizReducer";

export const initialState: TakenQuiz = {
  quizId: "",
  score: 0,
  answerList: [],
};

export const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({ children }: QuizProviderProp): JSX.Element => {
  const [quizLoading, setQuizLoading] = useState<boolean>(true);
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [state, quizDispatch] = useReducer(quizReducer, initialState);
  const [quizError, setQuizError] = useState("");

  const getCurrentQuizResponse = async (
    path: string
  ): Promise<CurrentQuizResponse | ServerError> => {
    try {
      const response = await axios.get<CurrentQuizResponse>(path);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }
      console.error(error);
      return {
        success: false,
        message: "Something went wrong! No axios error detected.",
      };
    }
  };

  const getCurrentQuizData = async (_id: string): Promise<void> => {
    setQuizLoading(true);
    setQuizError("");
    const response = await getCurrentQuizResponse(`/quiz/${_id}`);
    if (response.success) {
      setCurrentQuiz(response.quiz);
    }
    !response.success && setQuizError("Some error occured!");
    setQuizLoading(false);
  };

  return (
    <QuizContext.Provider
      value={{
        quizList,
        quizLoading,
        currentQuiz,
        currentQuizAnswer: state,
        getCurrentQuizData,
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
