/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../helper/api.config";

export const useSocket = (
  dispatch,
  setIsUserLoggedIn,
  setSessionModal,
  isUserLoggedIn,
  state
) => {
  const socketRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out!");
    dispatch({ type: "FLUSH_DATA" });
    localStorage.removeItem("login");
    setIsUserLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);
    const socket = socketRef.current;

    socket.on("connect", () => {
      socket.on("room-info", (data) => {
        console.log("room-info -> ", data);

        // update sessionModal info
        setSessionModal((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            rooms: data ?? [],
          },
        }));
      });

      socket.on("max-login-alert", (data) => {
        // update sessionModal info
        setSessionModal((prev) => ({
          ...prev,
          showModal: true,
          data: {
            ...prev.data,
            socket: socket,
            response: data,
            rooms: data?.room ?? [],
          },
        }));
      });

      socket.on("logout-alert", (data) => {
        console.log("logout-alert -> ", data);
        handleLogout();
      });
    });
  }, []);

  useEffect(() => {
    if (isUserLoggedIn && state.email) {
      socketRef.current?.emit("login", { email: state.email });
    }
  }, [isUserLoggedIn, state.email]);

  return socketRef.current;
};
