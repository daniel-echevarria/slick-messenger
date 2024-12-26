import "./ConversationHeader.css";
import CustomInput from "../../../../CustomInput/CustomInput";
import SelectInterlocutorDropDown from "./SelectInterlocutorDropdown/SelectInterlocutorDropDown";
import { useContext, useEffect, useState } from "react";
import { InterlocutorContext } from "../../DirectMessages";
import { ProfileContext } from "../../../HomePage";

const ConversationHeader = ({ profiles, children }) => {
  const interlocutorProfile = useContext(InterlocutorContext).interlocutor;
  const profileContext = useContext(ProfileContext);
  const [profilesList, setProfilesList] = useState(profiles);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const filteredProfiles = profiles.filter((profile) => {
      const normalizedProfileName = profile.display_name.toLowerCase();
      return normalizedProfileName.includes(inputValue.toLowerCase());
    });
    console.log(filteredProfiles);
    setProfilesList(filteredProfiles);
  }, [inputValue, profiles]);

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

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
            <SelectInterlocutorDropDown items={profilesList} />
            <span>To:</span>
            <CustomInput
              id={"new-msg-interlocutor-input"}
              handleChange={handleSearch}
              value={inputValue}
              autoFocus={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationHeader;
