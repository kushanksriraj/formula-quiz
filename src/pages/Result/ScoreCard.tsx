export type ScoreCardPropType = {
  userScore: number;
  totalScore: number;
};

export const ScoreCard = ({
  userScore,
  totalScore,
}: ScoreCardPropType): JSX.Element => {
  return (
    <div className="quiz__result__score">
      <div className="quiz__result__score-text">Score</div>
      <div className="quiz__result__score-marks">
        <span className="quiz__result__score-user">{userScore} </span>/{" "}
        {totalScore}
      </div>
    </div>
  );
};
