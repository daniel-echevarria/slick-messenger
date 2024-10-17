import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../../App";
import "./Messages.css";
import Message from "./Message/Message";

const Messages = ({ messages, interlocutor }) => {
  const current = useContext(AuthContext);
  const messagesBox = useRef(null);

  useEffect(() => {
    if (messagesBox.current) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [messages]);

  const messagesList = messages.map((msg) => {
    const sender = [interlocutor, current.user].find(
      (user) => user.id === msg.user_id
    );
    if (!sender) return;
    return <Message key={msg.id} msg={msg} sender={sender} />;
  });

  return (
    <>
      <div className="messages" ref={messagesBox}>
        {messagesList}
      </div>
    </>
  );
};

export default Messages;
