import { useContext } from "react";
import { QuizContext } from "../context";
import { ContextType } from "../context/quiz.types";

export const useQuiz = (): ContextType => {
  const contextValue = useContext(QuizContext);
  return contextValue!;
};
