import "./Conversation.css";
const Conversation = ({ interlocutor }) => {
  const headerContent = interlocutor
    ? interlocutor.name || interlocutor.email
    : "New Message";
  return (
    <div className="conversation">
      <div className="conversation-header">{headerContent}</div>
      <div className="messages">messages</div>
      <div className="message-creation">creation</div>
    </div>
  );
};

export default Conversation;
