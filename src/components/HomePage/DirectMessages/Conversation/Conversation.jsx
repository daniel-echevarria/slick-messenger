import "./Conversation.css";
import ConversationHeader from "./ConversationHeader/ConversationHeader";
import Messages from "./Messages/Messages";
import SendMessages from "./SendMessages/SendMessages";
import { useEffect, useState } from "react";

const Conversation = ({ interlocutor, friendship }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
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
      <ConversationHeader interlocutor={interlocutor} />
      <Messages messages={messages} />
      <SendMessages conversation={conversation} />
    </div>
  );
};

export default Conversation;
