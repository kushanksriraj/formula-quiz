/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from "react";
import { useUserData } from "../../hooks";
import "./SessionsModal.css";

export const SessionsModal = (): JSX.Element | null => {
  const { sessionModal, setSessionModal, userData, logOutUser } = useUserData();
  const [hasUserClickedOnDeviceLogout, setHasUserClickedOnDeviceLogout] =
    useState(true);

  if (!sessionModal.showModal) {
    return null;
  }

  const rooms = sessionModal?.data?.rooms ?? [];
  const socket = sessionModal?.data?.socket;
  const myId = sessionModal?.data?.socket?.id;

  const handleLogOut = (id: string) => {
    socket?.emit("logout-user", {
      id,
      email: userData.email,
    });
    setHasUserClickedOnDeviceLogout(false);
  };

  console.log({ sessionModal, myId });

  const handleJoinRoomOnDone = () => {
    setSessionModal((prev: any) => ({
      ...prev,
      showModal: false,
    }));
  };

  const handleLogOutFromThisDevice = () => {
    setSessionModal({
      showModal: false,
      data: {},
    });
    logOutUser();

    socket?.emit("logout-me-out", {
      email: userData.email,
    });
  };

  const renderUserList = () => {
    const roomList = rooms.filter((id: string) => id != myId);

    if (roomList.length) {
      return roomList.map((room: string, index: number) => {
        return (
          <p key={room}>
            <span className="user-id-wrapper">
              User #{index + 1} (id: {room})
            </span>
            <button onClick={() => handleLogOut(room)}>Log out</button>
          </p>
        );
      });
    }
    return <h5>No other devices logged in!</h5>;
  };

  return (
    <div className="sessions_modal__wrapper">
      <div className="sessions_modal__container">
        <h4>Max device limit reached!</h4>

        <div className="sessions_modal__rooms_container">
          {renderUserList()}
        </div>

        <div className="sessions_modal__button_container">
          <button onClick={handleLogOutFromThisDevice}>
            Log out from this device
          </button>
          <button
            onClick={handleJoinRoomOnDone}
            disabled={hasUserClickedOnDeviceLogout}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
