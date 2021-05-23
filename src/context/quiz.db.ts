import { QuizState } from "./quiz.types";

export const initialState: QuizState = {
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
      title: "Check your F1 Jargon knowledge",
      totalTimeInSeconds: "90",
      totalScore: 30,
      totalQuestions: 3,
      quizImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2021/03/featured-wordpress-quiz-plugins.png",
      questions: [
        {
          id: "sdmnfbhdbsibcusd",
          text: "What is a pitstop?",
          positiveMarks: 10,
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
          positiveMarks: 10,
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
          positiveMarks: 10,
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
    {
      id: "sdfjdshf4fdgfdgdjgt",
      title: "Challenge: Guess all the car parts!",
      totalTimeInSeconds: "90",
      totalScore: 30,
      totalQuestions: 3,
      quizImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2021/03/featured-wordpress-quiz-plugins.png",
      questions: [
        {
          id: "sdmnfbhdbsibcusd",
          text: "What is a pitstop?",
          positiveMarks: 10,
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
          positiveMarks: 10,
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
          positiveMarks: 10,
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
