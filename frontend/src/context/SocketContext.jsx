import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { useNotificationStore } from "../lib/notificationStore";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const { fetch } = useNotificationStore();

  useEffect(() => {
    if (!currentUser) {
      // User logged out — disconnect socket and reset
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("newUser", currentUser.id);
    });

    // Re-fetch notification count from DB whenever a message arrives
    // This is the source-of-truth approach — no manual +1 guessing
    newSocket.on("getMessage", () => {
      fetch();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};