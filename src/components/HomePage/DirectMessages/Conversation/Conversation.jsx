import { useContext, useEffect, useState } from "react";
// Own Components
import Profile from "../../Profile/Profile";
import ConversationHeader from "./ConversationHeader/ConversationHeader";
import Messages from "./Messages/Messages";
import SendMessages from "./SendMessages/SendMessages";
// Icons && CSS
import "./Conversation.css";
import messagesIcon from "../../../../assets/icons/messages.svg";
import messagesIconFilled from "../../../../assets/icons/messages-filled.svg";
import filesIcon from "../../../../assets/icons/files.svg";
import filesIconFilled from "../../../../assets/icons/files-filled.svg";
import { ProfileContext } from "../../HomePage";
import NavBar from "../../../NavBar/NavBar";

const apiUrl = import.meta.env.VITE_API_URL;

const Conversation = ({ friendship, profiles }) => {
  const profileContext = useContext(ProfileContext);

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [areLoading, setAreLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState(0);

  useEffect(() => {
    const getConversation = async () => {
      if (!friendship) {
        setMessages([]);
        return;
      }
      try {
        const response = await fetch(`${apiUrl}/conversations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ friendship_id: friendship.id }),
        });
        setAreLoading(true);
        if (response.ok) {
          const result = await response.json();
          setConversation(result);
          setMessages(result.messages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setAreLoading(false);
      }
    };
    getConversation();
  }, [friendship]);

  useEffect(() => {
    let myTimeout;
    if (areLoading) {
      myTimeout = setTimeout(() => {
        setShowSpinner(true);
      }, 300);
    } else {
      clearTimeout(myTimeout);
      setShowSpinner(false);
    }

    return () => clearTimeout(myTimeout);
  }, [areLoading]);

  const displayedProfile = profiles.find(
    (pro) => pro.id == profileContext.profile.id
  );

  const messagesPage = () => {
    return (
      <>
        {areLoading && showSpinner ? (
          "Loading..."
        ) : (
          <Messages messages={messages} profiles={profiles} />
        )}
        <SendMessages
          conversation={conversation}
          setMessages={setMessages}
          messages={messages}
        />
      </>
    );
  };

  const filesPage = () => {
    return "No files found for this channel.";
  };

  const tabs = [
    {
      id: 0,
      icon: messagesIcon,
      iconFilled: messagesIconFilled,
      text: "Messages",
      page: messagesPage,
    },
    {
      id: 1,
      icon: filesIcon,
      iconFilled: filesIconFilled,
      text: "Files",
      page: filesPage,
    },
  ];

  return (
    <div className="conversation">
      <div className="chat">
        <ConversationHeader profiles={profiles}>
          <NavBar
            setSelectedTabId={setSelectedTabId}
            selectedTabId={selectedTabId}
          >
            {tabs}
          </NavBar>
        </ConversationHeader>
        {tabs.find((tab) => tab.id == selectedTabId).page()}
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
