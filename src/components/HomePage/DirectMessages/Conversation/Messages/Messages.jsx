import { useContext, useEffect, useState } from "react";
import { YouContext } from "../../../../../App";
import "./Messages.css";
import Message from "./Message/Message";

const Messages = ({ messages, interlocutor }) => {
  const you = useContext(YouContext);

  const messagesList = messages.map((msg) => {
    const sender = [interlocutor, you].find((user) => user.id === msg.user_id);
    if (!sender) return;
    return <Message key={msg.id} msg={msg} sender={sender} />;
  });

  return (
    <>
      <div className="messages">{messagesList}</div>
    </>
  );
};

export default Messages;
