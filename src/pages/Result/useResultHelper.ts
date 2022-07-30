import { useEffect } from "react";
import { TakenQuiz } from "../../context/QuizContext/quiz.types";
import { useQuiz, useUserData } from "../../hooks";

export type UseResultHelperType = {
  quizResult: false | TakenQuiz | undefined;
  getCSSClass: (questionId: string, optionId: string) => string;
};

export const useResultHelper = (id: string): UseResultHelperType => {
  const { currentQuiz, quizLoading, getCurrentQuizData } = useQuiz();
  const { userData, userLoading } = useUserData();

  useEffect(() => {
    !userLoading && getCurrentQuizData(id);
  }, [userLoading]);

  const quizResult =
    !quizLoading &&
    !userLoading &&
    userData.takenQuizList.find((quiz) => quiz.quizId === id);

  const getCSSClass = (questionId: string, optionId: string): string => {
    const question = currentQuiz?.questionList.find(
      (question) => question._id === questionId
    );
    const option = question?.optionList.find(
      (option) => option._id === optionId
    );

    const answeredQuestion =
      quizResult &&
      quizResult.answerList.find((answer) => answer.questionId === questionId);

    if (answeredQuestion) {
      if (option?._id === answeredQuestion.selectedOptionId) {
        if (option?.isRight) {
          return "right option__text";
        }
        return "wrong option__text";
      }
    }

    if (option?.isRight) {
      return "right option__text";
    }
    return "option__text";
  };

  return { quizResult, getCSSClass };
};
