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
    <div>
      <h2>Quiz name: {selectedQuiz?.title}</h2>
      <img className="quiz__image" src={selectedQuiz?.quizImage} alt="" />
      {selectedQuiz && (
        <QuestionCard
          question={selectedQuiz.questions[questionNumber]}
          dispatch={answerDispatch}
          state={answerState}
          loadNextQuestion={loadNextQuestion}
        />
      )}
      {!isLastQuestion && <button onClick={loadNextQuestion}>Skip</button>}
      {!isLastQuestion && <button onClick={loadNextQuestion}>Next</button>}
      {isLastQuestion && <button onClick={submitQuiz}>Submit</button>}
    </div>
  );
};
