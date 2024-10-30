import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../../../App";
import "./Messages.css";
import Message from "./Message/Message";
import { InterlocutorContext } from "../../DirectMessages";

const Messages = ({ messages }) => {
  const current = useContext(AuthContext);
  const interlocutorProfile = useContext(InterlocutorContext).interlocutor;
  const messagesBox = useRef(null);

  useEffect(() => {
    if (messagesBox.current) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [messages]);

  const messagesList = messages.map((msg) => {
    if (!interlocutorProfile) return;
    const senderProfile =
      current.profile.user_id === msg.user_id
        ? current.profile
        : interlocutorProfile;
    if (!senderProfile) return;
    console.log(senderProfile);
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
