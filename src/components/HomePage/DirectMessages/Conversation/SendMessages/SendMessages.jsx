import "./SendMessages.css";
import CustomInput from "../../../../CustomInput/CustomInput.jsx";
import sendMessageIcon from "../../../../../assets/icons/send-msg.svg";

const SendMessages = () => {
  return (
    <div className="send-message-box">
      <div className="input-formating">
        <button>B</button>
      </div>
      <input
        type="text"
        className="msg-input"
        placeholder="Jot something down"
      />
      <div className="input-features-box">
        <div className="features"></div>
        <button>
          <img src={sendMessageIcon} alt="" className="icon send-msg-icon" />
        </button>
      </div>
    </div>
  );
};

export default SendMessages;
