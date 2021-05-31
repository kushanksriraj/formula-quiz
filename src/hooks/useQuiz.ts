import { useContext } from "react";
import { UseQuizType } from "../context/QuizContext/quiz.types";
import { QuizContext } from "../context/QuizContext/QuizContext";
import { useAxios } from "./useAxios";

export const useQuiz = (): UseQuizType => {
  const { getCurrentQuizResponse } = useAxios();
  const {
    quizList,
    quizLoading,
    currentQuiz,
    currentQuizAnswer,
    quizDispatch,
    setQuizList,
    setQuizLoading,
    quizError,
    setQuizError,
    setCurrentQuiz,
  } = useContext(QuizContext);

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

  return {
    quizList,
    quizLoading,
    currentQuiz,
    currentQuizAnswer,
    quizDispatch,
    setQuizList,
    setQuizLoading,
    quizError,
    setQuizError,
    setCurrentQuiz,
    getCurrentQuizData,
  };
};
