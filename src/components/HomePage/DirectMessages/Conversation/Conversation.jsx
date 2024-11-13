import { useContext, useEffect, useState } from "react";
// Own Components
import Profile from "../../Profile/Profile";
import ConversationHeader from "./ConversationHeader/ConversationHeader";
import NavButton from "../../../NavBar/NavButton/NavButton";
// Icons && CSS
import "./Conversation.css";
import messagesIcon from "../../../../assets/icons/messages.svg";
import messagesIconFilled from "../../../../assets/icons/messages-filled.svg";
import filesIcon from "../../../../assets/icons/files.svg";
import filesIconFilled from "../../../../assets/icons/files-filled.svg";
import { ProfileContext } from "../../HomePage";
import NavBar from "../../../NavBar/NavBar";
import MessagesSubPage from "./MessagesSubPage/MessagesSubPage";

const Conversation = ({ friendship, profiles, interlocutor }) => {
  const profileContext = useContext(ProfileContext);
  const [selectedTabId, setSelectedTabId] = useState(0);

  useEffect(() => {
    setSelectedTabId(0);
  }, [interlocutor]);

  const displayedProfile = profiles.find(
    (pro) => pro.id == profileContext.profile.id
  );

  const FilesPage = () => {
    return (
      <>
        <span>No files found for this channel.</span>
      </>
    );
  };

  const tabs = [
    {
      id: 0,
      icon: messagesIcon,
      iconFilled: messagesIconFilled,
      text: "Messages",
      page: <MessagesSubPage friendship={friendship} profiles={profiles} />,
    },
    {
      id: 1,
      icon: filesIcon,
      iconFilled: filesIconFilled,
      text: "Files",
      page: <FilesPage />,
    },
  ];

  const navButtons = tabs.map((el, index) => {
    return (
      <NavButton
        key={index}
        id={index}
        icon={selectedTabId == index ? el.iconFilled : el.icon}
        text={el.text}
        onClick={(e) => setSelectedTabId(e.target.id)}
        selectedTabId={selectedTabId}
      />
    );
  });

  return (
    <div className="conversation">
      <div className="chat">
        <ConversationHeader profiles={profiles}>
          <NavBar>{navButtons}</NavBar>
        </ConversationHeader>
        {tabs.find((tab) => tab.id == selectedTabId).page}
      </div>
      {displayedProfile && (
        <Profile
          profile={displayedProfile}
          show={profileContext.profile.show}
        />
      )}
    </div>
  );
};

export default Conversation;
