import { createContext, useContext, useReducer, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  UserDataProviderProp,
  UserDataType,
  UserDataContextType,
  UserDataResponse,
  LoginUserDataResponse,
  ServerError,
  SubmitUserDataResponse,
  SignUpArgsType,
  QuizResetResponseType,
} from "./userData.types";
import { userReducer } from "../../reducers/userReducer";
import { TakenQuiz } from "../QuizContext/quiz.types";
import { useNavigate } from "react-router";
import { useAxios } from "../../hooks";

const initialValue: UserDataType = {
  _id: null,
  name: "",
  email: "",
  takenQuizList: [],
};

export const UserDataContext = createContext<UserDataContextType | null>(null);
// createContext<UserDataContextType>({} as UserDataContextType);

// export const loginAndGetUserData = async (
//   email: string,
//   password: string,
//   path: string
// ): Promise<LoginUserDataResponse | ServerError> => {
//   try {
//     const response = await axios.post<LoginUserDataResponse>(path, {
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const serverError = error as AxiosError<ServerError>;
//       if (serverError && serverError.response) {
//         return serverError.response.data;
//       }
//     }
//     console.error(error);
//     return {
//       success: false,
//       message: "Something went wrong! No axios error detected.",
//     };
//   }
// };

// export const getUserDataResponse = async (
//   path: string
// ): Promise<UserDataResponse | ServerError> => {
//   try {
//     const response = await axios.get<UserDataResponse>(path);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const serverError = error as AxiosError<ServerError>;
//       if (serverError && serverError.response) {
//         return serverError.response.data;
//       }
//     }
//     console.error(error);
//     return {
//       success: false,
//       message: "Something went wrong! No axios error detected.",
//     };
//   }
// };

// export const resetQuizDataResponse = async (
//   path: string
// ): Promise<QuizResetResponseType | ServerError> => {
//   try {
//     const response = await axios.delete<QuizResetResponseType>(path);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const serverError = error as AxiosError<ServerError>;
//       if (serverError && serverError.response) {
//         return serverError.response.data;
//       }
//     }
//     console.error(error);
//     return {
//       success: false,
//       message: "Something went wrong! No axios error detected.",
//     };
//   }
// };

// export const signUpUserResponse = async ({
//   name,
//   email,
//   password,
//   path,
// }: SignUpArgsType): Promise<LoginUserDataResponse | ServerError> => {
//   try {
//     const response = await axios.post<LoginUserDataResponse>(path, {
//       user: { name, email, password, takenQuizList: [] },
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const serverError = error as AxiosError<ServerError>;
//       if (serverError && serverError.response) {
//         return serverError.response.data;
//       }
//     }
//     console.error(error);
//     return {
//       success: false,
//       message: "Something went wrong! No axios error detected.",
//     };
//   }
// };

// export const submitUserResponse = async (
//   path: string,
//   takenQuiz: TakenQuiz
// ): Promise<SubmitUserDataResponse | ServerError> => {
//   try {
//     const response = await axios.post<SubmitUserDataResponse>(path, {
//       takenQuiz,
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const serverError = error as AxiosError<ServerError>;
//       if (serverError && serverError.response) {
//         return serverError.response.data;
//       }
//     }
//     console.error(error);
//     return {
//       success: false,
//       message: "Something went wrong! No axios error detected.",
//     };
//   }
// };

export const UserDataProvider = ({
  children,
}: UserDataProviderProp): JSX.Element => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [state, dispatch] = useReducer(userReducer, initialValue);
  const [userLoading, setUserLoading] = useState(true);
  const navigate = useNavigate();
  const {
    loginAndGetUserData,
    getUserDataResponse,
    resetQuizDataResponse,
    signUpUserResponse,
    submitUserResponse,
    setAxiosAuthHeader
  } = useAxios();

  // const setAxiosAuthHeader = (token: string | null): void => {
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = token;
  //     return;
  //   }
  //   delete axios.defaults.headers.common["Authorization"];
  // };

  const getUserData = async (path: string): Promise<void> => {
    const response = await getUserDataResponse(path);
    if (response.success) {
      dispatch({
        type: "INITIALIZE_USER",
        payload: { userData: response.user },
      });
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setUserLoading(true);
    const response = await loginAndGetUserData(email, password, "/user/login");
    if (response.success) {
      setIsUserLoggedIn(true);
      setAxiosAuthHeader(response.user.token);
      // eslint-disable-next-line
      const { token, ...userData } = response.user;
      dispatch({
        type: "INITIALIZE_USER",
        payload: { userData },
      });
      try {
        localStorage.setItem(
          "login",
          JSON.stringify({ isUserLoggedIn: true, token: response.user.token })
        );
      } catch (err) {
        console.error(err);
      }
    }
    setUserLoading(false);
    return response.success;
  };

  const logOutUser = (): void => {
    setUserLoading(true);
    setIsUserLoggedIn(false);
    setAxiosAuthHeader(null);
    dispatch({ type: "FLUSH_DATA" });
    try {
      localStorage.removeItem("login");
    } catch (err) {
      console.log(err);
    }
    setUserLoading(false);
    navigate("/");
    return;
  };

  const signUpUser = async ({
    name,
    email,
    password,
    path,
  }: SignUpArgsType): Promise<boolean> => {
    setUserLoading(true);
    const response = await signUpUserResponse({ name, email, password, path });
    if (response.success) {
      setIsUserLoggedIn(true);
      setAxiosAuthHeader(response.user.token);
      // eslint-disable-next-line
      const { token, ...userData } = response.user;
      dispatch({
        type: "INITIALIZE_USER",
        payload: { userData },
      });
      try {
        localStorage.setItem(
          "login",
          JSON.stringify({ isUserLoggedIn: true, token: response.user.token })
        );
      } catch (err) {
        console.error(err);
      }
    }
    setUserLoading(false);
    return response.success;
  };

  const resetQuizData = async (path: string): Promise<boolean> => {
    setUserLoading(true);
    const response = await resetQuizDataResponse(path);
    if (response.success) {
      dispatch({
        type: "RESET_TAKENQUIZ",
        payload: {
          takenQuizList: response.takenQuizList,
        },
      });
    }

    setUserLoading(false);
    return response.success;
  };

  return (
    <UserDataContext.Provider
      value={{
        isUserLoggedIn,
        userData: state,
        userDispatch: dispatch,
        userLoading,
        loginUser,
        logOutUser,
        setIsUserLoggedIn,
        setUserLoading,
        getUserData,
        submitUserResponse,
        signUpUser,
        resetQuizData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const contextValue = useContext(UserDataContext);
  return contextValue!;
};
