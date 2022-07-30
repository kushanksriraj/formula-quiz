import { QuestionPropType } from "../../context/QuizContext/quiz.types";
import { useQuiz } from "../../hooks";

export type UseQuestionHelperType = {
  selectOptionOnClick: (id: string, isRight: boolean) => void;
};

export const useQuestionHelper = ({
  loading,
  setLoading,
  question,
  loadNextQuestion,
}: QuestionPropType): UseQuestionHelperType => {
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

  return { selectOptionOnClick };
};
