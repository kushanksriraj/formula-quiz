import axios, { AxiosError } from "axios";
import {
  LoginUserDataResponse,
  ServerError,
  UserDataResponse,
  QuizResetResponseType,
  SignUpArgsType,
  SubmitUserDataResponse,
} from "../context/UserDataContext/userData.types";

import {
  TakenQuiz,
  CurrentQuizResponse,
  QuizListResponse,
} from "../context/QuizContext/quiz.types";

export type UseAxiosReturnType = {
  setAxiosBaseURL: (BASE_URL: string) => void;
  setAxiosAuthHeader: (token: string | null) => void;
  loginAndGetUserData: (
    email: string,
    password: string,
    path: string
  ) => Promise<LoginUserDataResponse | ServerError>;
  getUserDataResponse: (
    path: string
  ) => Promise<UserDataResponse | ServerError>;
  resetQuizDataResponse: (
    path: string
  ) => Promise<QuizResetResponseType | ServerError>;
  signUpUserResponse: ({
    name,
    email,
    password,
    path,
  }: SignUpArgsType) => Promise<LoginUserDataResponse | ServerError>;
  submitUserResponse: (
    path: string,
    takenQuiz: TakenQuiz
  ) => Promise<SubmitUserDataResponse | ServerError>;
  getCurrentQuizResponse: (
    path: string
  ) => Promise<CurrentQuizResponse | ServerError>;
  getQuizList: (path: string) => Promise<QuizListResponse | ServerError>;
};

export const useAxios = (): UseAxiosReturnType => {
  const setAxiosBaseURL = (BASE_URL: string): void => {
    axios.defaults.baseURL = BASE_URL;
  };

  const setAxiosAuthHeader = (token: string | null): void => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      return;
    }
    delete axios.defaults.headers.common["Authorization"];
  };

  const loginAndGetUserData = async (
    email: string,
    password: string,
    path: string
  ): Promise<LoginUserDataResponse | ServerError> => {
    try {
      const response = await axios.post<LoginUserDataResponse>(path, {
        email,
        password,
      });
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

  const getUserDataResponse = async (
    path: string
  ): Promise<UserDataResponse | ServerError> => {
    try {
      const response = await axios.get<UserDataResponse>(path);
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

  const resetQuizDataResponse = async (
    path: string
  ): Promise<QuizResetResponseType | ServerError> => {
    try {
      const response = await axios.delete<QuizResetResponseType>(path);
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

  const signUpUserResponse = async ({
    name,
    email,
    password,
    path,
  }: SignUpArgsType): Promise<LoginUserDataResponse | ServerError> => {
    try {
      const response = await axios.post<LoginUserDataResponse>(path, {
        user: { name, email, password, takenQuizList: [] },
      });
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

  const submitUserResponse = async (
    path: string,
    takenQuiz: TakenQuiz
  ): Promise<SubmitUserDataResponse | ServerError> => {
    try {
      const response = await axios.post<SubmitUserDataResponse>(path, {
        takenQuiz,
      });
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

  const getCurrentQuizResponse = async (
    path: string
  ): Promise<CurrentQuizResponse | ServerError> => {
    try {
      const response = await axios.get<CurrentQuizResponse>(path);
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

  return {
    setAxiosBaseURL,
    //setAxiosIntercept
    setAxiosAuthHeader,
    loginAndGetUserData,
    getUserDataResponse,
    resetQuizDataResponse,
    signUpUserResponse,
    submitUserResponse,
    getCurrentQuizResponse,
    getQuizList,
  };
};
