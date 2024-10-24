import { useContext, useState } from "react";
import "./ConversationHeader.css";
import { InterlocutorContext } from "../../DirectMessages";
import { ProfileContext } from "../../../homePage";
import CustomInput from "../../../../CustomInput/CustomInput";
import SelectInterlocutorDropDown from "./SelectInterlocutorDropdown/SelectInterlocutorDropDown";

const ConversationHeader = ({ profiles }) => {
  const interlocutorProfile = useContext(InterlocutorContext).interlocutor;
  const profileContext = useContext(ProfileContext);
  const [inputIsFocused, setInputIsFocused] = useState(false);

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
          {interlocutorProfile.display_name ||
            interlocutorProfile.name ||
            interlocutorProfile.email}
        </button>
      ) : (
        <div className="new-msg-header">
          <span>New Message</span>
          <div className="new-msg-interlocutor">
            <SelectInterlocutorDropDown
              items={profiles}
              show={inputIsFocused}
              value={interlocutorProfile}
            />
            <span>To:</span>
            <CustomInput
              id={"new-msg-interlocutor-input"}
              setInputIsFocused={setInputIsFocused}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationHeader;
