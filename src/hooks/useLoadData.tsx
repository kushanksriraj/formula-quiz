import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserData } from "../context/UserDataContext/UserDataContext";
import { ServerError } from "../context/UserDataContext/userData.types";
import { BASE_URL } from "../helper/api.config";
import { useQuiz } from "./useQuiz";
import { QuizListResponse } from "../context/QuizContext/quiz.types";

export const useLoadData = (): void => {
  const { logOutUser, setIsUserLoggedIn, setUserLoading, getUserData } =
    useUserData();
  const { setQuizList, setQuizLoading, setQuizError } = useQuiz();
  const navigate = useNavigate();

  const setAxiosBaseURL = (BASE_URL: string): void => {
    axios.defaults.baseURL = BASE_URL;
  };

  const setAxiosIntercept = (): void => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          logOutUser();
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );
  };

  const setAxiosAuthHeader = (token: string | null): void => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      return;
    }
    delete axios.defaults.headers.common["Authorization"];
  };

  const getQuizList = async (
    path: string
  ): Promise<QuizListResponse | ServerError> => {
    try {
      const response = await axios.get<QuizListResponse>(path);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }
      console.error(error);
      return {
        success: false,
        message: "Something went wrong! No axios error detected.",
      };
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setAxiosBaseURL(BASE_URL);
        setAxiosIntercept();
        const localLoginData = localStorage.getItem("login");
        if (localLoginData) {
          const loginData: { isUserLoggedIn: boolean; token: string } =
            JSON.parse(localLoginData);
          loginData.isUserLoggedIn && setIsUserLoggedIn(true);
          setAxiosAuthHeader(loginData.token);
          await getUserData("/user");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setUserLoading(false);
        setQuizError("");
        const response = await getQuizList("/quiz");
        if (response.success) {
          setQuizList(response.quizzes);
        }
        !response.success && setQuizError("Some error occured!");
        setQuizLoading(false);
      }
    })();
  }, []);
};
