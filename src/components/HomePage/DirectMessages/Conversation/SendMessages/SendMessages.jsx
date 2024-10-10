import "./SendMessages.css";
import sendMessageIcon from "../../../../../assets/icons/send-msg.svg";
import CustomInput from "../../../../CustomInput/CustomInput.jsx";
import { useState, useEffect } from "react";

const SendMessages = ({ conversation, interlocutor }) => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message || !conversation) {
      return;
    }
    const sendMessage = async () => {
      const res = await fetch("http://localhost:3000/messages", {
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
        console.log(result);
      }
    };
    sendMessage();
  }, [message, conversation]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    setMessage(inputValue);
  };

  return (
    <div className="send-message-box">
      <div className="input-formating">
        <button>B</button>
      </div>
      <CustomInput
        placeholder={`Message ${interlocutor.name || interlocutor.email}`}
        value={inputValue}
        handleChange={handleChange}
      />
      <div className="input-features-box">
        <div className="features"></div>
        <button onClick={handleSendMessage}>
          <img src={sendMessageIcon} className="icon send-msg-icon" />
        </button>
      </div>
    </div>
  );
};

export default SendMessages;
