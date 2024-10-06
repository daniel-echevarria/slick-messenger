import { useState } from "react";
import Conversation from "./Conversation/Conversation";
import DirectMessages from "./DirectMessages/DirectMessages";
import "./HomePage.css";

const HomePage = () => {
  const [recipient, setRecipient] = useState(null);
  return (
    <div className="app">
      <header></header>
      <nav></nav>
      <DirectMessages />
      <Conversation recipient={recipient} />
    </div>
  );
};

export default HomePage;
