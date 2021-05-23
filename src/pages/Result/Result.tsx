import "./Result.css";
import { useParams } from "react-router";
import { useQuiz } from "../../hooks";

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
    <div className="quiz__result">
      <img className="quiz__result__img" src={selectedQuiz?.quizImage} alt="" />
      <div className="quiz__result__title">{selectedQuiz?.title}</div>
      <div className="quiz__result__score">
        <div className="quiz__result__score-text">Score</div>
        <div className="quiz__result__score-marks">
          <span className="quiz__result__score-user">
            {" "}
            {quizResult?.score || 0}{" "}
          </span>{" "}
          / {selectedQuiz?.totalScore}
        </div>
      </div>

      <div className="quiz__result__review-prompt">Review your answers</div>

      <div className="quiz__result__review">
        {selectedQuiz?.questions.map((question, index) => {
          return (
            <div key={question.id} className="quiz__result__review-body">
              <div className="quiz__result__review-question">
                <span className="quiz__result__review-question-q">
                Q.{index + 1}

                </span>
                 {question.text}
              </div>
              <div className="quiz__result__review-options">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
