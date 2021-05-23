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
      title: "How many F1 jargons do you know?",
      totalTimeInMinutes: "1.5",
      totalScore: 30,
      totalQuestions: 3,
      quizImage:
        "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/07/jar-gon.jpg",
      questions: [
        {
          id: "sdmnfbhdbsibcusd",
          text: "What is a Chassis?",
          positiveMarks: 10,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage:
            "https://avtotachki.com/wp-content/uploads/2020/04/shassi0-1.jpg",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "The main part of a car to which the suspension is attached",
              isRight: true,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "Side brakes that let the car do cool drifts",
              isRight: false,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "Bolt of fuel tank",
              isRight: false,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "Back side of the side mirror",
              isRight: false,
            },
          ],
        },
        {
          id: "sdmnfbhdbsibcgfdjgkre",
          text: "What is the meaning of Pits in F1?",
          positiveMarks: 10,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage:
            "https://static.wixstatic.com/media/ab3a81_f678565435a44a9d87d9824d1ae490df~mv2.jpg/v1/fill/w_960,h_580,al_c,q_90/ab3a81_f678565435a44a9d87d9824d1ae490df~mv2.jpg",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "Black and white stripped area around tracks",
              isRight: false,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "Pathway for safety car",
              isRight: false,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "An area of track where the cars stop for new tyres and fuel",
              isRight: true,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "VIP area for audience",
              isRight: false,
            },
          ],
        },
        {
          id: "sdmnfbhdbsibcgfdjggfdglkfg",
          text: "What is a Visor strip?",
          positiveMarks: 10,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage: "https://pbs.twimg.com/media/DQdLsrWVoAETDvp.jpg",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "A band worn on wrist by drivers",
              isRight: false,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "A decoration element for car",
              isRight: false,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "Falg for time-out during race",
              isRight: false,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "A strip that is fitted on driver's helmet for protection",
              isRight: true,
            },
          ],
        },
      ],
    },
    {
      id: "sdfjdshf4fdgfdgdjgt",
      title: "Check your knowledge of F1 history!",
      totalTimeInMinutes: "1.5",
      totalScore: 30,
      totalQuestions: 3,
      quizImage:
        "https://lh3.googleusercontent.com/proxy/oLh3ul38j0AZbv_xPv1A6gvZUXZYyITRstZjstPbu3paRvcWKN51PoIPp4M7n7TFOczw3TL0rXdo-6lKG2c8yo4NQVVU",
      questions: [
        {
          id: "sdmnfbhdbsibcusd",
          text: "Who is the youngest F1 driver to win a race?",
          positiveMarks: 10,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage:
            "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/2_verstappen_interview.jpg?itok=eW3VNvkw",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "Lewis Hamilton",
              isRight: false,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "Max Verstappen",
              isRight: true,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "Aryton Senna",
              isRight: false,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "Yuki Tsunoda",
              isRight: false,
            },
          ],
        },
        {
          id: "sdmnfbhdbsibcgfdjgkre",
          text: "Which team holds the record for the most wins in a season?",
          positiveMarks: 10,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage:
            "https://www.racefans.net/wp-content/uploads/2019/03/racefansdotnet-20190317-142455-94.jpg",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "Mercedes",
              isRight: true,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "Ferrari",
              isRight: false,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "RedBull",
              isRight: false,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "Alpha Tauri",
              isRight: false,
            },
          ],
        },
        {
          id: "sdmnfbhdbsibcgfdjggfdglkfg",
          text: "Who made a world record by winning all three Indian Grands Prix?",
          positiveMarks: 10,
          negativeMarks: 0,
          timeInSeconds: "30",
          questionImage: "https://pbs.twimg.com/media/B2wXFYvCcAAMo5o.jpg",
          options: [
            {
              id: "dfgdfgeg4gd",
              text: "Fernando Alonso",
              isRight: false,
            },
            {
              id: "dfgdfgesdfdfsg4fdgfgd",
              text: "Max Verstappen",
              isRight: false,
            },
            {
              id: "dfgdfgeg4gfgfhftryryd",
              text: "Michael Schumacher",
              isRight: false,
            },
            {
              id: "dfgdgdfdfgeg4grtrted",
              text: "Sebastian Vettel",
              isRight: true,
            },
          ],
        },
      ],
    },
  ],
};
