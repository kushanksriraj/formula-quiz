import { QuizCardProps } from "../../context/quiz.types";
import "./QuizCard.css";
import { useState } from "react";
import { QuizStartModal } from "../";
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
          <button onClick={() => setShowModal(true)}>Start quiz</button>
        </div>
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
        />
      )}
    </>
  );
};
