import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserDataContext } from "../context";
import {
  SignUpArgsType,
  UseUserDataType,
} from "../context/UserDataContext/userData.types";
import { useAxios } from "./useAxios";

export const useUserData = (): UseUserDataType => {
  const {
    getUserDataResponse,
    loginAndGetUserData,
    setAxiosAuthHeader,
    signUpUserResponse,
    resetQuizDataResponse,
  } = useAxios();
  const {
    isUserLoggedIn,
    userData,
    userDispatch,
    userLoading,
    setIsUserLoggedIn,
    setUserLoading,
    socket,
    sessionModal,
    setSessionModal,
  } = useContext(UserDataContext);
  const navigate = useNavigate();

  const getUserData = async (path: string): Promise<void> => {
    const response = await getUserDataResponse(path);
    if (response.success) {
      userDispatch({
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
      userDispatch({
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
    userDispatch({ type: "FLUSH_DATA" });
    try {
      localStorage.removeItem("login");
    } catch (err) {
      console.error(err);
    }
    socket?.emit("logout-me-out", {
      email: userData.email,
    });
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
      userDispatch({
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
      userDispatch({
        type: "RESET_TAKENQUIZ",
        payload: {
          takenQuizList: response.takenQuizList,
        },
      });
    }

    setUserLoading(false);
    return response.success;
  };

  return {
    isUserLoggedIn,
    userData,
    userDispatch,
    userLoading,
    setIsUserLoggedIn,
    setUserLoading,
    getUserData,
    loginUser,
    logOutUser,
    signUpUser,
    resetQuizData,
    sessionModal,
    setSessionModal,
  };
};
