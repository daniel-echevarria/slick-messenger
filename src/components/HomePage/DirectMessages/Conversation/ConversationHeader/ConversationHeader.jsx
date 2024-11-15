import "./ConversationHeader.css";
import CustomInput from "../../../../CustomInput/CustomInput";
import SelectInterlocutorDropDown from "./SelectInterlocutorDropdown/SelectInterlocutorDropDown";
import { useContext } from "react";
import { InterlocutorContext } from "../../DirectMessages";
import { ProfileContext } from "../../../HomePage";

const ConversationHeader = ({ profiles, children }) => {
  const interlocutorProfile = useContext(InterlocutorContext).interlocutor;
  const profileContext = useContext(ProfileContext);

  const handleProfileClick = (e) => {
    profileContext.handleProfileClick(e);
  };

  const interlocutorName = () => {
    return (
      interlocutorProfile.display_name ||
      interlocutorProfile.name ||
      interlocutorProfile.email
    );
  };

  return (
    <>
      {interlocutorProfile ? (
        <div className="conversation-header">
          <button
            className="interlocutor-btn"
            value={interlocutorProfile.id}
            onClick={handleProfileClick}
          >
            <img
              src={interlocutorProfile.avatar}
              alt=""
              className="avatar-img"
            />
            {interlocutorName()}
          </button>
          {children}
        </div>
      ) : (
        <div className="new-msg-header">
          <span>New Message</span>
          <div className="new-msg-interlocutor">
            <SelectInterlocutorDropDown items={profiles} />
            <span>To:</span>
            <CustomInput id={"new-msg-interlocutor-input"} autoFocus={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationHeader;
