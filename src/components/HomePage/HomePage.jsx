<<<<<<< HEAD
=======
import { useState } from "react";
import Conversation from "./Conversation/Conversation";
>>>>>>> conversation-section
import DirectMessages from "./DirectMessages/DirectMessages";
import "./HomePage.css";

const HomePage = () => {
  const [recipient, setRecipient] = useState(null);
  return (
    <div className="app">
      <header></header>
      <nav></nav>
      <DirectMessages />
<<<<<<< HEAD
      <div className="conversation"></div>
=======
      <Conversation recipient={recipient} />
>>>>>>> conversation-section
    </div>
  );
};

export default HomePage;
