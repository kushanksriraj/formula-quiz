import "./Result.css";
import { useParams } from "react-router";
import { useQuiz, useUserData } from "../../hooks";
import { useResultHelper } from "./useResultHelper";
import { ScoreCard } from "./ScoreCard";
import { QuestionReviewBox } from "./QuestionReviewBox";

export const Result = (): JSX.Element => {
  const { id } = useParams();
  const { quizResult, getCSSClass } = useResultHelper(id);
  const { currentQuiz, quizLoading, quizError } = useQuiz();
  const { userLoading } = useUserData();

  return (
    <div className="quiz__result">
      {(userLoading || quizLoading) && <h2>Loading...</h2>}
      {quizError !== "" && <h2>{quizError}</h2>}
      <img className="quiz__result__img" src={currentQuiz?.quizImage} alt="" />
      <div className="quiz__result__title">{currentQuiz?.title}</div>
      <ScoreCard
        userScore={(quizResult && quizResult.score) || 0}
        totalScore={currentQuiz?.totalScore || 0}
      />
      <div className="quiz__result__review-prompt">Review your answers</div>
      <div className="quiz__result__review">
        {currentQuiz?.questionList.map((question, index) => {
          return (
            <QuestionReviewBox
              key={question._id}
              getCSSClass={getCSSClass}
              question={question}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};
