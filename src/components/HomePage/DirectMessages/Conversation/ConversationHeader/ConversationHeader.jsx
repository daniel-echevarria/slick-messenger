import "./ConversationHeader.css";
import CustomInput from "../../../../CustomInput/CustomInput";
import SelectInterlocutorDropDown from "./SelectInterlocutorDropdown/SelectInterlocutorDropDown";

import { useContext } from "react";
import { InterlocutorContext } from "../../DirectMessages";
import { ProfileContext } from "../../../HomePage";

import messagesIcon from "../../../../../assets/icons/messages.svg";
import messagesIconFilled from "../../../../../assets/icons/messages-filled.svg";
import filesIcon from "../../../../../assets/icons/files.svg";
import filesIconFilled from "../../../../../assets/icons/files-filled.svg";
import NavBar from "../../../../NavBar/NavBar";

const ConversationHeader = ({ profiles }) => {
  const interlocutorProfile = useContext(InterlocutorContext).interlocutor;
  const profileContext = useContext(ProfileContext);

  const handleProfileClick = (e) => {
    console.log(e.target.value);
    profileContext.handleProfileClick(e);
  };

  const interlocutorName = () => {
    return (
      interlocutorProfile.display_name ||
      interlocutorProfile.name ||
      interlocutorProfile.email
    );
  };

  const tabs = [
    { icon: messagesIcon, iconFilled: messagesIconFilled, text: "Messages" },
    { icon: filesIcon, iconFilled: filesIconFilled, text: "Files" },
  ];

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
          <NavBar tabs={tabs} />
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
