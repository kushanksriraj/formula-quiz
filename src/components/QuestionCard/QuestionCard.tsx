import "./QuestionCard.css";
import { QuestionPropType } from "../../context/QuizContext/quiz.types";
import { Option } from "./Option";
import { useQuiz } from "../../hooks";

export const QuestionCard = ({
  question,
  loadNextQuestion,
  loading,
  setLoading,
}: QuestionPropType): JSX.Element => {
  const { currentQuizAnswer, quizDispatch } = useQuiz();

  const isAlreadyAnswered = (questionId: string): boolean =>
    currentQuizAnswer.answerList.some(
      (question) => question.questionId === questionId
    );

  const selectOptionOnClick = (id: string, isRight: boolean): void => {
    !loading &&
      !isAlreadyAnswered(question._id) &&
      quizDispatch({
        type: "SET_SCORE",
        payload: {
          score: isRight
            ? currentQuizAnswer.score + question.positiveMarks
            : currentQuizAnswer.score - question.negativeMarks,
        },
      });

    !loading &&
      !isAlreadyAnswered(question._id) &&
      quizDispatch({
        type: "SAVE_ANSWER",
        payload: {
          answer: {
            questionId: question._id,
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
