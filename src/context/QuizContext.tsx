import { createContext, useReducer } from "react";
import { ContextType, QuizProviderProp } from "./quiz.types";
import { quizReducer } from "../reducers/quizReducer";
import { initialState } from "./quiz.db";

export const QuizContext = createContext<ContextType | null>(null);

export const QuizProvider = ({ children }: QuizProviderProp): JSX.Element => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
