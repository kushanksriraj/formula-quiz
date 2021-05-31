import "./Home.css";
import { useQuiz, useUserData } from "../../hooks";
import { QuizCard } from "../../components";

export const Home = (): JSX.Element => {
  const { quizList, quizLoading, quizError } = useQuiz();
  const { userData } = useUserData();

  const isQuizTaken = (id: string): boolean => {
    return userData.takenQuizList.some((quiz) => quiz.quizId === id);
  };

  return (
    <div className="quiz__home">
      {quizLoading && <h2>Loading....</h2>}
      {quizError !== "" && <h2>{quizError}</h2>}
      {quizList.map((quiz) => {
        return (
          <QuizCard
            key={quiz._id}
            id={quiz._id}
            title={quiz.title}
            totalQuestions={quiz.totalQuestions}
            totalTimeInMinutes={quiz.totalTimeInMinutes}
            quizImage={quiz.quizImage}
            taken={isQuizTaken(quiz._id)}
          />
        );
      })}
    </div>
  );
};

/**
 * TODOs
 * - Write Tests for both reducer
 * - Make a loading componenet and show it inplace of loading
 * - Refactor server source code
 * - Refactor Login and SignUp components
 * - Fix the blank screen after quiz submit
 * - add more quizzes
 * - add a "Try these quizzes" prompt on home page
 */