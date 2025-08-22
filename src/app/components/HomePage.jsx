"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import InputField from "./InputField";
import ActiveUsersList from "./ActiveUsersList";
import { io } from "socket.io-client";

export default function HomePage({ user }) {
  const [activeUsers, setActiveUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getActiveUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,name")
        .eq("online", true);
      if (!error && data) setActiveUsers(data);
    };

    getActiveUsers();

    const channel = supabase
      .channel("active-users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        (payload) => {
          console.log("Realtime changes ", payload);
          const newData = payload.new;
          if (!newData) return;

          setActiveUsers((prev) => {
            if (newData.online) {
              const exists = prev.find((u) => u.id === newData.id);
              if (exists) {
                return prev.map((u) => (u.id === newData.id ? newData : u));
              } else return [...prev, newData];
            } else {
              return prev.filter((u) => u.id !== newData.id);
            }
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  //const currentUser = { id: "123", name: "Sady" }; // Normally from auth
  const [text, setText] = useState("");
  // console.log("User is : ", user);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    // listen for messages
    newSocket.on("message", (msg) => {
      console.log("New message: ", msg);
      // setMessages((prev) => [...prev, msg.message]);
    });
   

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (!socket) return;
    socket.emit("message", {
      user: user.email,
      message: text,
    });
  };

  const sendPrivateMessage = (formData) => {
    if (!socket) return;
    const recipentId = formData.get("reciepentId");
    const message = formData.get("privateMessage");
    socket.emit("private-message", {
      from: user.id,
      to: recipentId,
      message: message,
    });
  };

  console.log("messages: ", messages);
  return (
    // <div className="font-medium text-3xl mt-3 ml-3">
    //   Active Users : {activeUsers.length}
    //   {activeUsers.map((user, index) => (
    //     <li key={index}>
    //       {user.id} : {user.name}
    //     </li>
    //   ))}
    // </div>
    <main className="p-6">
      <h1>Welcome, {user.email}</h1>
      <ActiveUsersList currentUser={user} />
      <input
        type="text"
        placeholder="Type something"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          console.log("button clicked");
          sendMessage();
        }}
      >
        Send public
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendPrivateMessage(new FormData(e.target));
          e.target.reset()
        }}
        className="flex flex-col gap-2"
      >
        <input name="reciepentId" type="text" placeholder="Enter recipent id" />
        <input
          name="privateMessage"
          type="text"
          placeholder="Enter your message"
        />
        <button>send private message</button>
      </form>
      {/* {messages.map((m, i) => (
        <div key={i}>{m}</div>
      ))} */}
    </main>
  );
}
