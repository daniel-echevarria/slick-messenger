import "./Message.css";
import { format } from "date-fns";

const Message = ({ msg, sender }) => {
  const formattedDate = format(msg.created_at, "EEEE, MMMM do");
  const formattedTime = format(msg.created_at, "p");

  const DateSeparator = () => {
    return (
      <div className="date-sent-separator">
        <hr />
        <button className="date-sent-btn">{formattedDate}</button>
        <hr />
      </div>
    );
  };

  return (
    <div className="message-and-date" key={msg.id}>
      <DateSeparator />
      <div className="message">
        <img src={sender.avatar_url} alt="" />
        <div className="sender-and-msg">
          <div className="msg-infos">
            <span className="sender">{sender.name || sender.email}</span>
            <span className="time-sent">{formattedTime}</span>
          </div>
          <span className="msg-content">{msg.content}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
