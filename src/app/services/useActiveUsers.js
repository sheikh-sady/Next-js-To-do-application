"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useActiveUsers(user) {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    const socket = io("http://localhost:4000");

     socket.emit("user:join", {
        id: user.id,
        email: user.email,
      });

    // socket.on("connect", () => {
    //   console.log("Connected:", socket.id);
     
    // });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    socket.on("active-users", (users) => {
      setActiveUsers(users);
    });

    socket.on("private-message", ({ from, message }) => {
      console.log("private message from ", from, message);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return activeUsers;
}
