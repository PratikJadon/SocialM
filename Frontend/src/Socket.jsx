import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { socketInit, socketUninit } from "./redux/Slices/socketSlice";
import { Outlet } from "react-router-dom";

const Socket = () => {
  const dispatch = useDispatch();
  const serverPath = import.meta.env.VITE_SOCKET_URL;
  const token = useSelector((state) => state?.auth?.user?.token);
  const socket = useMemo(() => {
    if (token) {
      const newSocket = io(serverPath, {
        auth: {
          token: token,
        },
      });
      // Optionally log socket events for debugging
      newSocket.on("connect", () => {
        dispatch(socketInit(newSocket));
        console.log(`Socket connected, ID: ${newSocket.id}`);
      });
      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
        dispatch(socketUninit());
      });

      return newSocket;
    }
    return null;
  }, [serverPath, token]);

  useEffect(() => {
    if (socket) {
      dispatch(socketInit(socket));
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Socket;
