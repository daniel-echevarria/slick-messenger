import { useContext } from "react";
import "./ConversationHeader.css";
import { InterlocutorContext } from "../../DirectMessages";

const ConversationHeader = () => {
  const interlocutor = useContext(InterlocutorContext);

  return (
    <div className="conversation-header">
      {interlocutor ? (
        <button className="interlocutor-btn">
          <img src={interlocutor.profile.picture} alt="" className="" />
          {interlocutor.profile.name || interlocutor.profile.email}
        </button>
      ) : (
        <div className="new-msg-header">New Message</div>
      )}
    </div>
  );
};

export default ConversationHeader;
