import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../../../App";
import "./Messages.css";
import Message from "./Message/Message";
import { InterlocutorContext } from "../../DirectMessages";

const Messages = ({ messages }) => {
  const current = useContext(AuthContext);
  const interlocutorProfile = useContext(InterlocutorContext);
  const messagesBox = useRef(null);

  useEffect(() => {
    if (messagesBox.current) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [messages]);

  const messagesList = messages.map((msg) => {
    const senderProfile = [interlocutorProfile, current.profile].find(
      (profile) => profile.user_id === msg.user_id
    );
    console.log(senderProfile);
    if (!senderProfile) return;
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
