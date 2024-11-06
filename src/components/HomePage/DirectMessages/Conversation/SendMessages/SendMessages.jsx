import "./SendMessages.css";
import sendMessageIcon from "../../../../../assets/icons/send-msg.svg";
import CustomInput from "../../../../CustomInput/CustomInput.jsx";
import { useState, useEffect, useContext } from "react";
import { InterlocutorContext } from "../../DirectMessages.jsx";
const apiUrl = import.meta.env.VITE_API_URL;

const SendMessages = ({ conversation, setMessages, messages }) => {
  const interlocutorProfile = useContext(InterlocutorContext).interlocutor;

  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!isSent) return;
    const sendMessage = async () => {
      setIsSending(true);
      const res = await fetch(`${apiUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          message: message,
          conversation_id: conversation.conversation.id,
        }),
      });
      if (res.ok) {
        const result = await res.json();
        setMessages([...messages, result]);
        setIsSent(false);
        setInputValue("");
      }
      setIsSending(false);
    };
    sendMessage();
  }, [message, conversation, isSent, messages, setMessages]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    setMessage(inputValue);
    setIsSent(true);
  };

  return (
    <div className="send-message-box">
      <div className="input-formating"></div>
      <CustomInput
        placeholder={
          interlocutorProfile
            ? `Message ${
                interlocutorProfile.display_name || interlocutorProfile.email
              }`
            : "Jot something down"
        }
        value={isSending ? "Sending..." : inputValue}
        handleChange={handleChange}
        onEnter={handleSendMessage}
      />
      <div className="input-features-box">
        <div className="features"></div>
        <button
          onClick={handleSendMessage}
          className={"send confirm"}
          disabled={!((inputValue && interlocutorProfile) || isSending)}
        >
          <img src={sendMessageIcon} className="icon send-msg-icon" />
        </button>
      </div>
    </div>
  );
};

export default SendMessages;
