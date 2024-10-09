import { useContext } from "react";
import "./Messages.css";
import { YouContext } from "../../../../../App";

const Messages = ({ messages, interlocutor }) => {
  const you = useContext(YouContext);

  const messagesList = messages.map((msg) => {
    console.log(interlocutor);
    const sender = [interlocutor, you].find((user) => user.id === msg.user_id);
    return (
      <div className="message" key={msg.id}>
        <div className="date-sent-separator">
          <hr />
          <button className="date-sent-btn">{msg.created_at}</button>
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
