import { QuizCardProps } from "../../context/quiz.types";
import "./QuizCard.css";
import { QuizStartModal } from "../";
export const QuizCard = (props: QuizCardProps): JSX.Element => {
  return (
    <>
      <article className="quiz__card">
        <div className="quiz__card__question">{props.title}</div>
        <div className="quiz__card__rule">
          Rules:
          <ul>
            <li>Time: {props.totalTimeInSeconds} seconds</li>
            <li>{props.totalQuestions} Questions</li>
            <li>No negative marks</li>
          </ul>
        </div>
        <div className="quiz__card__button">
          <button onClick={() => props.setShowModal(true)}> Start quiz</button>
        </div>
      </article>
      {props.showModal && (
        <QuizStartModal
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          id={props.id}
        />
      )}
    </>
  );
};
