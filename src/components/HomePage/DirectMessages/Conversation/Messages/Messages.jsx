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
          <button className="date-sent">{msg.created_at}</button>
          <hr />
        </div>
        <p>{sender.name || sender.email}</p>
        <p>{msg.content}</p>
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
