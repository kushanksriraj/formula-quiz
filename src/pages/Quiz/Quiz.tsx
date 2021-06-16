import "./Quiz.css";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuiz, useUserData } from "../../hooks";
import { QuestionCard } from "../../components";
import { useQuizHelper } from "./useQuizHelper";

export const Quiz = (): JSX.Element => {
  const { id } = useParams();
  const { loadNextQuestion, submitQuiz, questionNumber } = useQuizHelper(id);
  const { quizLoading, currentQuiz, quizError } = useQuiz();
  const { userLoading } = useUserData();
  const [loading, setLoading] = useState<boolean>(false);

  const isLastQuestion =
    currentQuiz && questionNumber === currentQuiz.totalQuestions - 1;

  const showSkipAndNextBtns = !isLastQuestion && currentQuiz;
  const quizImageURL = currentQuiz?.questionList[questionNumber].questionImage;
  const currentQuestion = currentQuiz?.questionList[questionNumber];

  return (
    <div className="quiz">
      {quizLoading && <h2>Loading....</h2>}
      {quizError !== "" && <h2>{quizError}</h2>}
      <div className="quiz__title">{currentQuiz?.title}</div>
      <img className="quiz__question__image" src={quizImageURL} alt="" />

      {currentQuiz && (
        <QuestionCard
          question={currentQuestion!}
          loadNextQuestion={loadNextQuestion}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {showSkipAndNextBtns && (
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
