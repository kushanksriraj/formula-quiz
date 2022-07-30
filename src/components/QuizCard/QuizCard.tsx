import { QuizCardProps } from "../../context/QuizContext/quiz.types";
import "./QuizCard.css";
import { useState } from "react";
import { QuizStartModal } from "../";
import { Link } from "react-router-dom";
export const QuizCard = (props: QuizCardProps): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <article className="quiz__card">
        <div className="quiz__card__question">{props.title}</div>
        <div className="quiz__card__rule">
          <ul>
            <li>Time: {props.totalTimeInMinutes} minutes</li>
            <li>{props.totalQuestions} Questions</li>
            <li>No negative marks</li>
          </ul>
        </div>
        <div className="quiz__card__button">
          {props.taken && (
            <Link
              to={`/quiz/${props.id}/result`}
              className="quiz__card__result"
            >
              See result
            </Link>
          )}
          <button onClick={() => setShowModal(true)}>
            {props.taken ? "Restart quiz" : "Start quiz"}
          </button>
        </div>
        {props.taken && <div className="quiz__card__taken">Already taken!</div>}
      </article>
      {showModal && (
        <QuizStartModal
          showModal={showModal}
          setShowModal={setShowModal}
          id={props.id}
          title={props.title}
          totalQuestions={props.totalQuestions}
          totalTimeInMinutes={props.totalTimeInMinutes}
          quizImage={props.quizImage}
          taken={props.taken}
        />
      )}
    </>
  );
};
