import { QuizCard } from "../../components";
import { Quiz } from "../../context/QuizContext/quiz.types";
import { useUserData } from "../../context/UserDataContext/UserDataContext";
import { useQuiz } from "../../hooks";
import "./user-profile.css";

export const UserProfile = (): JSX.Element => {
  const { userData, logOutUser, userLoading } = useUserData();
  const { quizList } = useQuiz();
  const getTakenQuizList = (): Quiz[] => {
    return quizList.filter((quiz) =>
      userData.takenQuizList.some((userQuiz) => userQuiz.quizId === quiz._id)
    );
  };

  return (
    <div className="user__container">
      <div className="user__greet">
        Welcome
        <span className="user__greet-text">{userData.name}!</span>
      </div>
      <div className="user__data__container">
        <div className="user__data">
          <div className="user__data__name-wrapper">
            NAME: <span className="user__data__name">{userData.name}</span>
          </div>
          <div className="user__data__email-wrapper">
            EMAIL: <span className="user__data__email">{userData.email}</span>
          </div>
          <div className="user__logout__btn-wrapper">
            <button className="user__logout__btn" onClick={logOutUser}>
              {userLoading ? "Loggin out.." : "LOG OUT"}
            </button>
          </div>
        </div>
      </div>
      <div className="user__takenquiz-prompt">Your taken quizzes</div>
      <div className="user__takenquiz__container">
        {getTakenQuizList().map((quiz) => {
          return (
            <QuizCard
              key={quiz._id}
              id={quiz._id}
              title={quiz.title}
              totalQuestions={quiz.totalQuestions}
              totalTimeInMinutes={quiz.totalTimeInMinutes}
              quizImage={quiz.quizImage}
              taken={true} // show result page when taken is true
            />
          );
        })}
      </div>
    </div>
  );
};
