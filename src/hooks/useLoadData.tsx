import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../helper/api.config";
import { useQuiz } from "./useQuiz";
import { useAxios } from "./useAxios";
import { useUserData } from "./useUserData";

export const useLoadData = (): void => {
  const { logOutUser, setIsUserLoggedIn, setUserLoading, getUserData } =
    useUserData();
  const { setQuizList, setQuizLoading, setQuizError } = useQuiz();
  const navigate = useNavigate();
  const { setAxiosBaseURL, setAxiosAuthHeader, getQuizList } = useAxios();

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

  useEffect(() => {
    (async () => {
      try {
        setAxiosBaseURL(BASE_URL);
        setAxiosIntercept();
        const localLoginData = localStorage.getItem("login");
        if (localLoginData) {
          const loginData: { isUserLoggedIn: boolean; token: string } =
            JSON.parse(localLoginData);
          if (loginData.isUserLoggedIn) {
            setIsUserLoggedIn(true);
          }
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
