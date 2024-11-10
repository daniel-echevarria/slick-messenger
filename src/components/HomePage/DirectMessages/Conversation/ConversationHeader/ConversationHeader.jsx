import "./ConversationHeader.css";
import CustomInput from "../../../../CustomInput/CustomInput";
import SelectInterlocutorDropDown from "./SelectInterlocutorDropdown/SelectInterlocutorDropDown";
import { useContext } from "react";
import { InterlocutorContext } from "../../DirectMessages";
import { ProfileContext } from "../../../HomePage";
import messagesIcon from "../../../../../assets/icons/messages.svg";
import NavButton from "../../../../NavButton/NavButton";

const ConversationHeader = ({ profiles }) => {
  const interlocutorProfile = useContext(InterlocutorContext).interlocutor;
  const profileContext = useContext(ProfileContext);

  const handleProfileClick = (e) => {
    console.log(e.target.value);
    profileContext.handleProfileClick(e);
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
            {interlocutorProfile.display_name ||
              interlocutorProfile.name ||
              interlocutorProfile.email}
          </button>
          <div className="conv-header-nav">
            <NavButton icon={messagesIcon} text={"Messages"} />
            <NavButton icon={messagesIcon} text={"Canvas"} />
          </div>
        </div>
      ) : (
        <div className="new-msg-header">
          <span>New Message</span>
          <div className="new-msg-interlocutor">
            <SelectInterlocutorDropDown items={profiles} />
            <span>To:</span>
            <CustomInput id={"new-msg-interlocutor-input"} />
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationHeader;
