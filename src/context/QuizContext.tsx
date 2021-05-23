import { createContext, useReducer } from "react";
import { QuizState, ContextType, QuizProviderProp } from "./quiz.types";
import { quizReducer } from "../reducers/quizReducer";

const initialState: QuizState = {
  userData: {
    id: "sdffjkfdfhfretbfd78bc",
    name: "Kushank",
    email: "kushanksriraj@gmail.com",
    token: "uhrker87bb4jkrjsfd47hsdf",
    takenQuizzes: [],
  },
  quizList: [
    {
      id: "sdfjdshf4t",
      title: "Quiz 1: About F1 Jargon",
      totalTimeInSeconds: "90",
      totalScore: 30,
      totalQuestions: 3,
      quizImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2021/03/featured-wordpress-quiz-plugins.png",
      questions: [
        {
          id: "sdmnfbhdbsibcusd",
          text: "What is a pitstop?",
          positiveMarks: 5,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage:
            "https://www.elegantthemes.com/blog/wp-content/uploads/2021/03/featured-wordpress-quiz-plugins.png",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "The car stopping in between a race",
              isRight: true,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "Shaking chapaign",
              isRight: false,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "Running out of fuel",
              isRight: false,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "Hitting another car",
              isRight: false,
            },
          ],
        },
        {
          id: "sdmnfbhdbsibcgfdjgkre",
          text: "What does a safety car do?",
          positiveMarks: 5,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage:
            "https://www.elegantthemes.com/blog/wp-content/uploads/2021/03/featured-wordpress-quiz-plugins.png",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "Helps the winner",
              isRight: false,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "Saves lives in a crash",
              isRight: true,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "It is the cause of crash",
              isRight: false,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "Just wanders on the track",
              isRight: false,
            },
          ],
        },
        {
          id: "sdmnfbhdbsibcgfdjggfdglkfg",
          text: "What do understand by NASCAR?",
          positiveMarks: 5,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage:
            "https://www.elegantthemes.com/blog/wp-content/uploads/2021/03/featured-wordpress-quiz-plugins.png",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "Never heard about it",
              isRight: false,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "Runs after a car",
              isRight: false,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "Bunch of crews who quickly change tyres in a pitstop",
              isRight: true,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "Cheers a racer on radio",
              isRight: false,
            },
          ],
        },
      ],
    },
  ],
};

export const QuizContext = createContext<ContextType | null>(null);

export const QuizProvider = ({ children }: QuizProviderProp): JSX.Element => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
