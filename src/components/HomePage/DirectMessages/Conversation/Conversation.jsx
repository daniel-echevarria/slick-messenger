import { ProfileContext } from "../../homePage";
import Profile from "../../Profile/Profile";
import "./Conversation.css";
import ConversationHeader from "./ConversationHeader/ConversationHeader";
import Messages from "./Messages/Messages";
import SendMessages from "./SendMessages/SendMessages";
import { useContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const Conversation = ({ friendship, profiles, setProfilesWereEdited }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const profileContext = useContext(ProfileContext);

  const currentProfile = profiles.find(
    (pro) => pro.id == profileContext.profile.id
  );

  useEffect(() => {
    const getConversation = async () => {
      if (!friendship) return;
      try {
        const response = await fetch(`${apiUrl}/conversations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ friendship_id: friendship.id }),
        });
        if (response.ok) {
          const result = await response.json();
          setConversation(result);
          setMessages(result.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [friendship]);

  return (
    <div className="conversation">
      <div className="chat">
        <ConversationHeader profiles={profiles} />
        <Messages messages={messages} />
        <SendMessages
          conversation={conversation}
          setMessages={setMessages}
          messages={messages}
        />
      </div>
      {currentProfile && (
        <Profile
          profile={currentProfile}
          show={profileContext.profile.show}
          setProfilesWereEdited={setProfilesWereEdited}
        />
      )}
    </div>
  );
};

export default Conversation;
