import { useAxios, useQuiz, useUserData } from "../../hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export type UseQuizHelperType = {
  loadNextQuestion: () => void;
  submitQuiz: () => Promise<void>;
  questionNumber: number;
};

export const useQuizHelper = (id: string): UseQuizHelperType => {
  const { userData, userLoading, setUserLoading, resetQuizData, userDispatch } =
    useUserData();
  const {
    setCurrentQuiz,
    quizDispatch,
    getCurrentQuizData,
    currentQuiz,
    setQuizError,
    currentQuizAnswer,
  } = useQuiz();
  const { submitUserResponse } = useAxios();
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const navigate = useNavigate();

  const isQuizTaken = (id: string): boolean => {
    return userData.takenQuizList.some((quiz) => quiz.quizId === id);
  };

  useEffect(() => {
    setCurrentQuiz(null);
    quizDispatch({
      type: "RESET_AND_SET_NEW_QUIZ_ID",
      payload: { quizId: id },
    });
  }, []);

  useEffect(() => {
    !userLoading && getCurrentQuizData(id);
  }, [userLoading]);

  const loadNextQuestion = (): void => {
    if (currentQuiz && questionNumber < currentQuiz.totalQuestions - 1) {
      setQuestionNumber((questionNumber) => questionNumber + 1);
    }
  };

  const submitQuiz = async (): Promise<void> => {
    setUserLoading(true);
    setQuizError("");
    if (isQuizTaken(id)) {
      await resetQuizData(`/user/quiz/${id}`);
    }
    const response = await submitUserResponse("/user", currentQuizAnswer);
    if (response.success) {
      userDispatch({
        type: "SAVE_QUIZ_ANSWER",
        payload: {
          takenQuiz: currentQuizAnswer,
        },
      });
      setCurrentQuiz(null);
      setUserLoading(false);
      navigate(`/quiz/${id}/result`);
    }
    !response.success && setQuizError("Some error occured!");
  };

  return { loadNextQuestion, submitQuiz, questionNumber };
};
