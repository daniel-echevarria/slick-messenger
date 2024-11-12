import "./Messages.css";
import { useEffect, useRef } from "react";
import Message from "./Message/Message";

const Messages = ({ messages, profiles }) => {
  const messagesBox = useRef(null);

  useEffect(() => {
    if (messagesBox.current) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [messages]);

  const messagesList = messages.map((msg) => {
    const senderProfile = profiles.find(
      (profile) => profile.user_id === msg.user_id
    );
    return <Message key={msg.id} msg={msg} senderProfile={senderProfile} />;
  });

  return (
    <>
      <div className="messages" ref={messagesBox}>
        {messagesList}
      </div>
    </>
  );
};

export default Messages;
