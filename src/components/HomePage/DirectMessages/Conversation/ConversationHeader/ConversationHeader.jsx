import { useContext } from "react";
import "./ConversationHeader.css";
import { InterlocutorContext } from "../../DirectMessages";

const ConversationHeader = () => {
  const interlocutorProfile = useContext(InterlocutorContext);

  return (
    <div className="conversation-header">
      {interlocutorProfile ? (
        <button className="interlocutor-btn">
          <img src={interlocutorProfile.picture} alt="" className="" />
          {interlocutorProfile.name || interlocutorProfile.email}
        </button>
      ) : (
        <div className="new-msg-header">New Message</div>
      )}
    </div>
  );
};

export default ConversationHeader;
