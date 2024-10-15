import "./ConversationHeader.css";

const ConversationHeader = ({ interlocutor }) => {
  return (
    <div className="conversation-header">
      {interlocutor ? (
        <button className="interlocutor-btn">
          <img src={interlocutor.avatar_url} alt="" className="" />
          {interlocutor.name || interlocutor.email}
        </button>
      ) : (
        <div className="new-msg-header">New Message</div>
      )}
    </div>
  );
};

export default ConversationHeader;
