import { useContext, useEffect, useState } from "react";
import { YouContext } from "../../../../../App";
import "./Messages.css";
import { format } from "date-fns";

const Messages = ({ messages, interlocutor }) => {
  const you = useContext(YouContext);

  const messagesList = messages.map((msg) => {
    const formatedDate = format(msg.created_at, "EEEE, MMMM do");
    const sender = [interlocutor, you].find((user) => user.id === msg.user_id);
    return (
      <div className="message" key={msg.id}>
        <div className="date-sent-separator">
          <hr />
          <button className="date-sent-btn">{formatedDate}</button>
          <hr />
        </div>
        <div className="sender-and-msg">
          <span className="sender">{sender.name || sender.email}</span>
          <span>{msg.content}</span>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="messages">{messagesList}</div>
    </>
  );
};

export default Messages;
