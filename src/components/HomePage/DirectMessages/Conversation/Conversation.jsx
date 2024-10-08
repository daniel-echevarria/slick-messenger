import "./Conversation.css";
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
      <div className="messages">messages</div>
      <div className="message-creation">creation</div>
    </div>
  );
};

export default Conversation;
