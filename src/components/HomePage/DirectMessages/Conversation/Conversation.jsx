import "./Conversation.css";
import SendMessages from "./SendMessages/SendMessages";

const Conversation = ({ interlocutor, conversation }) => {
  console.log(`this is the conversation id ${conversation.id}`);

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
      <SendMessages conversation={conversation} />
    </div>
  );
};

export default Conversation;
