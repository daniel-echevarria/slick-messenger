import { useContext } from "react";
import "./ConversationHeader.css";
import { InterlocutorContext } from "../../DirectMessages";
import { ProfileContext } from "../../../homePage";

const ConversationHeader = () => {
  const interlocutorProfile = useContext(InterlocutorContext);
  const profileContext = useContext(ProfileContext);

  const handleProfileClick = (e) => {
    console.log(e.target.value);
    profileContext.handleProfileClick(e);
  };

  return (
    <div className="conversation-header">
      {interlocutorProfile ? (
        <button
          className="interlocutor-btn"
          value={interlocutorProfile.id}
          onClick={handleProfileClick}
        >
          <img src={interlocutorProfile.picture} alt="" />
          {interlocutorProfile.name || interlocutorProfile.email}
        </button>
      ) : (
        <div className="new-msg-header">New Message</div>
      )}
    </div>
  );
};

export default ConversationHeader;
