import "./Home.css";
import { useQuiz } from "../../hooks";
import { QuizCard } from "../../components";

export const Home = (): JSX.Element => {
  const {
    state: { quizList },
  } = useQuiz();

  return (
    <div className="quiz__home">
      {quizList.map((quiz) => {
        return (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            totalQuestions={quiz.totalQuestions}
            totalTimeInMinutes={quiz.totalTimeInMinutes}
            quizImage={quiz.quizImage}
          />
        );
      })}
    </div>
  );
};
