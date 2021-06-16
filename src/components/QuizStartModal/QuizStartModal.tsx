import "./QuizStartModal.css";
import { QuizStartModalProps } from "../../context/QuizContext/quiz.types";
import { useNavigate } from "react-router";

export const QuizStartModal = ({
  showModal,
  setShowModal,
  id,
  title,
  totalQuestions,
  totalTimeInMinutes,
  quizImage,
  taken,
}: QuizStartModalProps): JSX.Element => {
  const navigate = useNavigate();

  const goBackOnClick = (): void => {
    setShowModal(false);
  };

  const startQuizOnClick = (): void => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="quiz__start__modal">
      <div
        className="quiz__start__modal-body"
        style={{ display: showModal ? "flex" : "none" }}
      >
        <img className="quiz__start__modal__img" src={quizImage} alt="" />

        <div className="quiz__start__modal__title">{title}</div>

        <ul className="quiz__start__modal__rules">
          <li>Total time: {totalTimeInMinutes} minutes</li>
          <li>Total questions: {totalQuestions}</li>
        </ul>
        <div className="quiz__start__modal__buttons">
          <button onClick={goBackOnClick}>Go back</button>
          <button onClick={startQuizOnClick}>
            {taken ? "Restart quiz" : "Start quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};
