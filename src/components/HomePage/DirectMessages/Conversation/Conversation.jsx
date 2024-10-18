import { AuthContext } from "../../../../App";
import Profile from "../../Profile/Profile";
import "./Conversation.css";
import ConversationHeader from "./ConversationHeader/ConversationHeader";
import Messages from "./Messages/Messages";
import SendMessages from "./SendMessages/SendMessages";
import { useContext, useEffect, useState } from "react";

const Conversation = ({ interlocutor, friendship }) => {
  const current = useContext(AuthContext);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      if (!friendship) return;
      try {
        const response = await fetch(`http://localhost:3000/conversations`, {
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
        <ConversationHeader interlocutor={interlocutor} />
        <Messages messages={messages} interlocutor={interlocutor} />
        <SendMessages
          conversation={conversation}
          interlocutor={interlocutor}
          setMessages={setMessages}
          messages={messages}
        />
      </div>
      <Profile profile={current.profile} />
    </div>
  );
};

export default Conversation;
