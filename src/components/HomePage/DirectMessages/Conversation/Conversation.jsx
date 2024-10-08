import "./Conversation.css";
import SendMessages from "./SendMessages/SendMessages";
const Conversation = ({ interlocutor }) => {
  return (
    <div className="conversation">
      <div className="conversation-header">
        {interlocutor ? (
          <button className="interlocutor-btn">
            {interlocutor.name || interlocutor.email}
          </button>
        ) : (
          <div className="new-msg-header">New Message</div>
        )}
      </div>
      <div className="messages"></div>
      <SendMessages />
    </div>
  );
};

export default Conversation;
