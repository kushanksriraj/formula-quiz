import "./QuestionCard.css";
import { QuestionPropType } from "../../context/quiz.types";
import { useState } from "react";
import { Option } from "./Option";

export const QuestionCard = ({
  question,
  dispatch,
  state,
  loadNextQuestion,
}: QuestionPropType): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const isAlreadyAnswered = (questionId: string): boolean =>
    state.answers.some((question) => question.questionId === questionId);

  const selectOptionOnClick = (id: string, isRight: boolean): void => {
    !loading &&
      !isAlreadyAnswered(question.id) &&
      dispatch({
        type: "SET_SCORE",
        payload: {
          score: isRight
            ? state.score + question.positiveMarks
            : state.score - question.negativeMarks,
        },
      });

    !loading &&
      !isAlreadyAnswered(question.id) &&
      dispatch({
        type: "SAVE_ANSWER",
        payload: {
          answer: {
            questionId: question.id,
            selectedOptionId: id,
            isCorrect: isRight,
          },
        },
      });
    setLoading(true);
    setTimeout(() => {
      loadNextQuestion();
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="quiz__question">{question.text}</div>
      {question.options.map((option) => {
        return (
          <Option
            key={option.id}
            option={option}
            callback={selectOptionOnClick}
            loading={loading}
          />
        );
      })}
    </div>
  );
};
