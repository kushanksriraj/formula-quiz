import { useParams } from "react-router";
import { useQuiz } from "../hooks";

export const Result = (): JSX.Element => {
  const { id } = useParams();
  const { state } = useQuiz();

  const selectedQuiz = state.quizList.find((quiz) => quiz.id === id);

  const quizResult = state.userData.takenQuizzes.find(
    (answer) => answer.quizId === id
  );

  const getCSSClass = (questionId: string, optionId: string): string => {
    const question = selectedQuiz?.questions.find(
      (question) => question.id === questionId
    );
    const option = question?.options.find((option) => option.id === optionId);

    const answeredQuestion = quizResult?.answers.find(
      (answer) => answer.questionId === questionId
    );

    if (option?.id === answeredQuestion?.selectedOptionId) {
      if (option?.isRight) {
        return "right option__text";
      }
      return "wrong option__text";
    }

    if (option?.isRight) {
      return "right option__text";
    }
    return "option__text";
  };

  return (
    <div>
      <h2>Quiz: {selectedQuiz?.title}</h2>
      <h3>Total score: {selectedQuiz?.totalScore}</h3>
      <h3>You scored: {quizResult?.score}</h3>
      {selectedQuiz?.questions.map((question) => {
        return (
          <div key={question.id}>
            <h4>{question.text}</h4>
            {question.options.map((option) => {
              return (
                <div
                  key={option.id}
                  className={getCSSClass(question.id, option.id)}
                >
                  {option.text}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
