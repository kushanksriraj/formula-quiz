import "./QuestionCard.css";
import { QuestionPropType } from "../../context/QuizContext/quiz.types";
import { Option } from "./Option";
import { useQuestionHelper } from "./useQuestionHelper";

export const QuestionCard = ({
  question,
  loadNextQuestion,
  loading,
  setLoading,
}: QuestionPropType): JSX.Element => {
  
  const { selectOptionOnClick } = useQuestionHelper({
    question,
    loadNextQuestion,
    loading,
    setLoading,
  });

  return (
    <div>
      <div className="quiz__question">Q. {question.text}</div>
      <div className="quiz__options">
        {question.optionList.map((option) => {
          return (
            <Option
              key={option._id}
              option={option}
              callback={selectOptionOnClick}
              loading={loading}
            />
          );
        })}
      </div>
    </div>
  );
};
