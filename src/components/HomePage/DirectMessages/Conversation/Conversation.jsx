import { ProfileContext } from "../../HomePage";
import Profile from "../../Profile/Profile";
import "./Conversation.css";
import ConversationHeader from "./ConversationHeader/ConversationHeader";
import Messages from "./Messages/Messages";
import SendMessages from "./SendMessages/SendMessages";
import { useContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const Conversation = ({ friendship, profiles }) => {
  const profileContext = useContext(ProfileContext);

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [areLoading, setAreLoading] = useState(false);

  useEffect(() => {
    const getConversation = async () => {
      if (!friendship) return;
      try {
        setAreLoading(true);
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
      } finally {
        setAreLoading(false);
      }
    };
    getConversation();
  }, [friendship]);

  const displayedProfile = profiles.find(
    (pro) => pro.id == profileContext.profile.id
  );

  return (
    <div className="conversation">
      <div className="chat">
        <ConversationHeader profiles={profiles} />
        {areLoading ? (
          "Loading..."
        ) : (
          <Messages messages={messages} profiles={profiles} />
        )}
        <SendMessages
          conversation={conversation}
          setMessages={setMessages}
          messages={messages}
        />
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
