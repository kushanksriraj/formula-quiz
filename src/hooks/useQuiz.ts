import { useContext } from "react";
import { QuizContextType } from "../context/QuizContext/quiz.types";
import { QuizContext } from "../context/QuizContext/QuizContext";

export const useQuiz = (): QuizContextType => {
  const contextValue = useContext(QuizContext);
  return contextValue!;
};
