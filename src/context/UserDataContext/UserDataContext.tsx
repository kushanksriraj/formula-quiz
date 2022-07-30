import { createContext, useReducer, useState } from "react";
import {
  UserDataProviderProp,
  UserDataType,
  UserDataContextType,
} from "./userData.types";
import { userReducer } from "../../reducers/userReducer";
import { useSocket } from "../../hooks/useSocket";

const initialValue: UserDataType = {
  _id: null,
  name: "",
  email: "",
  takenQuizList: [],
};

export const UserDataContext = createContext<UserDataContextType>(
  {} as UserDataContextType
);

export const UserDataProvider = ({
  children,
}: UserDataProviderProp): JSX.Element => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [state, dispatch] = useReducer(userReducer, initialValue);
  const [userLoading, setUserLoading] = useState(true);
  const [sessionModal, setSessionModal] = useState({
    showModal: false,
    data: {},
  });

  const socket = useSocket(
    dispatch,
    setIsUserLoggedIn,
    setSessionModal,
    isUserLoggedIn,
    state
  );

  return (
    <UserDataContext.Provider
      value={{
        isUserLoggedIn,
        userData: state,
        userDispatch: dispatch,
        userLoading,
        setIsUserLoggedIn,
        setUserLoading,
        socket,
        sessionModal,
        setSessionModal,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
