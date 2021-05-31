import "./Home.css";
import { useQuiz } from "../../hooks";
import { QuizCard } from "../../components";
import { useUserData } from "../../context/UserDataContext/UserDataContext";

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
 * TODO
 * - Style user profile page --- DONE
 * - show option to see result of a quiz, in Quiz Card in User profile page DONE
 * - Refactor big functions, move them to hooks or helper files
 * - Refactor server code
 * - write tests for quizReducer and userReducer
 */
