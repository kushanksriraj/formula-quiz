import "./Quiz.css";
import { useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuiz } from "../../hooks";
import { QuestionCard } from "../../components";
import { answerReducer } from "../../reducers/answerReducer";

export const Quiz = (): JSX.Element => {
  const { id } = useParams();
  const {
    state: { quizList },
    dispatch,
  } = useQuiz();
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [answerState, answerDispatch] = useReducer(answerReducer, {
    quizId: id,
    score: 0,
    answers: [],
  });

  const [loading, setLoading] = useState<boolean>(false);

  const selectedQuiz = quizList.find((quiz) => quiz.id === id);

  const loadNextQuestion = (): void => {
    if (selectedQuiz && questionNumber < selectedQuiz.totalQuestions - 1) {
      setQuestionNumber((questionNumber) => questionNumber + 1);
    }
  };

  const submitQuiz = (): void => {
    dispatch({
      type: "SAVE_DATA_ON_SUBMIT",
      payload: {
        takenQuiz: answerState,
      },
    });
    navigate(`/quiz/${id}/result`);
  };

  const isLastQuestion =
    selectedQuiz && questionNumber === selectedQuiz.totalQuestions - 1;

  return (
    <div className="quiz">
      <div className="quiz__title">{selectedQuiz?.title}</div>
      <img
        className="quiz__question__image"
        src={selectedQuiz?.questions[questionNumber].questionImage}
        alt=""
      />
      {selectedQuiz && (
        <QuestionCard
          question={selectedQuiz.questions[questionNumber]}
          dispatch={answerDispatch}
          state={answerState}
          loadNextQuestion={loadNextQuestion}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {!isLastQuestion && (
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
          SUBMIT
        </button>
      )}
    </div>
  );
};
