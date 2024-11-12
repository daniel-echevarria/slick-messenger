import { useState, useEffect } from "react";
import Messages from "./Messages/Messages";
import SendMessages from "./SendMessages/SendMessages";

const apiUrl = import.meta.env.VITE_API_URL;

const MessagesSubPage = ({ friendship, profiles }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [areLoading, setAreLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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

  const page = () => {
    if (areLoading && showSpinner) return "Loading...";
    return (
      <>
        <Messages messages={messages} profiles={profiles} />
        <SendMessages
          conversation={conversation}
          setMessages={setMessages}
          messages={messages}
        />
      </>
    );
  };

  return page();
};

export default MessagesSubPage;
