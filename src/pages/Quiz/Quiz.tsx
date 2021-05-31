import "./Quiz.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuiz } from "../../hooks";
import { QuestionCard } from "../../components";
import { useUserData } from "../../context/UserDataContext/UserDataContext";

export const Quiz = (): JSX.Element => {
  const { id } = useParams();
  const {
    quizLoading,
    getCurrentQuizData,
    currentQuiz,
    currentQuizAnswer,
    quizDispatch,
    quizError,
    setQuizError,
    setCurrentQuiz,
  } = useQuiz();
  const {
    userDispatch,
    submitUserResponse,
    setUserLoading,
    userLoading,
    userData,
    resetQuizData,
  } = useUserData();
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

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
      console.log("Line 55: Reset API fired!");
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

  const isLastQuestion =
    currentQuiz && questionNumber === currentQuiz.totalQuestions - 1;

  return (
    <div className="quiz">
      {quizLoading && <h2>Loading....</h2>}
      {quizError !== "" && <h2>{quizError}</h2>}
      <div className="quiz__title">{currentQuiz?.title}</div>
      <img
        className="quiz__question__image"
        src={currentQuiz?.questionList[questionNumber].questionImage}
        alt=""
      />
      {currentQuiz && (
        <QuestionCard
          question={currentQuiz.questionList[questionNumber]}
          loadNextQuestion={loadNextQuestion}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {!isLastQuestion && currentQuiz && (
        <div className="quiz__question__button">
          <button disabled={loading} onClick={loadNextQuestion}>
            SKIP
          </button>
          <button disabled={loading} onClick={loadNextQuestion}>
            NEXT
          </button>
        </div>
      )}

      {isLastQuestion && (
        <button
          disabled={loading}
          className="quiz__submit__button"
          onClick={submitQuiz}
        >
          {userLoading ? "Submitting.." : "SUBMIT"}
        </button>
      )}
    </div>
  );
};
