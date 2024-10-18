import DirectMessages from "./DirectMessages/DirectMessages";
import "./HomePage.css";
import LogOut from "./LogOut/LogOut";
import { AuthContext } from "../../App";
import { useContext } from "react";
import Profile from "./Profile/Profile";

const HomePage = () => {
  const current = useContext(AuthContext);

  return (
    <div className="app">
      <header></header>
      <nav>
        <div className="tab-container"></div>
        <img src={current.profile.picture} className="current-user" />
      </nav>
      <DirectMessages />
      <LogOut />
    </div>
  );
};

export default HomePage;
