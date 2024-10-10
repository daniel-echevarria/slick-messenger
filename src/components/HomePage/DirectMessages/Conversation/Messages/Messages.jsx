import { useContext, useEffect, useState } from "react";
import { YouContext } from "../../../../../App";
import "./Messages.css";
import { format } from "date-fns";

const Messages = ({ messages, interlocutor }) => {
  const you = useContext(YouContext);

  const messagesList = messages.map((msg) => {
    const formattedDate = format(msg.created_at, "EEEE, MMMM do");
    const formattedTime = format(msg.created_at, "p");
    const sender = [interlocutor, you].find((user) => user.id === msg.user_id);
    console.log(sender);
    return (
      <div className="message" key={msg.id}>
        <div className="date-sent-separator">
          <hr />
          <button className="date-sent-btn">{formattedDate}</button>
          <hr />
        </div>
        <div className="sender-and-msg">
          <div className="msg-infos">
            <span className="sender">{sender.name || sender.email}</span>
            <span className="time-sent">{formattedTime}</span>
          </div>
          <span className="msg-content">{msg.content}</span>
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
