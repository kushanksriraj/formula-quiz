import "./Home.css";
import { useState } from "react";
import { useQuiz } from "../../hooks";
import { QuizCard } from "../../components";

export const Home = (): JSX.Element => {
  const {
    state: { quizList },
  } = useQuiz();

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="quiz__home">
      {quizList.map((quiz) => {
        return (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            totalQuestions={quiz.totalQuestions}
            totalTimeInSeconds={quiz.totalTimeInSeconds}
            quizImage={quiz.quizImage}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        );
      })}
    </div>
  );
};
