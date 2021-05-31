import "./Result.css";
import { useParams } from "react-router";
import { useUserData } from "../../context/UserDataContext/UserDataContext";
import { useQuiz } from "../../hooks";
import { useEffect } from "react";

export const Result = (): JSX.Element => {
  const { id } = useParams();
  const { currentQuiz, quizLoading, getCurrentQuizData, quizError } = useQuiz();
  const { userData, userLoading } = useUserData();

  useEffect(() => {
    !userLoading && getCurrentQuizData(id);
  }, [userLoading]);

  const quizResult =
    !quizLoading &&
    !userLoading &&
    userData.takenQuizList.find((quiz) => quiz.quizId === id);

  const getCSSClass = (questionId: string, optionId: string): string => {
    const question = currentQuiz?.questionList.find(
      (question) => question._id === questionId
    );
    const option = question?.optionList.find(
      (option) => option._id === optionId
    );

    const answeredQuestion =
      quizResult &&
      quizResult.answerList.find((answer) => answer.questionId === questionId);

    if (answeredQuestion) {
      if (option?._id === answeredQuestion.selectedOptionId) {
        if (option?.isRight) {
          return "right option__text";
        }
        return "wrong option__text";
      }
    }

    if (option?.isRight) {
      return "right option__text";
    }
    return "option__text";
  };

  return (
    <div className="quiz__result">
      {(userLoading || quizLoading) && <h2>Loading...</h2>}
      {quizError !== "" && <h2>{quizError}</h2>}
      <img className="quiz__result__img" src={currentQuiz?.quizImage} alt="" />
      <div className="quiz__result__title">{currentQuiz?.title}</div>
      <div className="quiz__result__score">
        <div className="quiz__result__score-text">Score</div>
        <div className="quiz__result__score-marks">
          <span className="quiz__result__score-user">
            {" "}
            {(quizResult && quizResult.score) || 0}{" "}
          </span>{" "}
          / {currentQuiz?.totalScore}
        </div>
      </div>

      <div className="quiz__result__review-prompt">Review your answers</div>

      <div className="quiz__result__review">
        {currentQuiz?.questionList.map((question, index) => {
          return (
            <div key={question._id} className="quiz__result__review-body">
              <div className="quiz__result__review-question">
                <span className="quiz__result__review-question-q">
                  Q.{index + 1}
                </span>
                {question.text}
              </div>
              <div className="quiz__result__review-options">
                {question.optionList.map((option) => {
                  return (
                    <div
                      key={option._id}
                      className={getCSSClass(question._id, option._id)}
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
