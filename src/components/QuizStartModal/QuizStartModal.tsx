import "./QuizStartModal.css";
import { QuizStartModalProps } from "../../context/quiz.types";
import { useNavigate } from "react-router";

export const QuizStartModal = ({
  showModal,
  setShowModal,
  id,
}: QuizStartModalProps): JSX.Element => {
  const navigate = useNavigate();

  const goBackOnClick = (): void => {
    setShowModal(false);
  };

  const startQuizOnClick = (): void => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div
      className="quiz__start__modal"
      style={{ display: showModal ? "block" : "none" }}
    >
      This is a modal.
      <button onClick={goBackOnClick}>Go back</button>
      <button onClick={startQuizOnClick}>Start quiz</button>
    </div>
  );
};
