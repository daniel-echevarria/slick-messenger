import DirectMessages from "./DirectMessages/DirectMessages";
import "./HomePage.css";
import LogOut from "./LogOut/LogOut";
import { AuthContext } from "../../App";
import { createContext, useContext, useState } from "react";

export const ProfileContext = createContext(null);

const HomePage = () => {
  const current = useContext(AuthContext);
  const [profileState, setProfileState] = useState({
    id: current.profile.id,
    show: false,
  });

  const handleProfileClick = (e) => {
    setProfileState({
      id: e.target.value,
      show: true,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile: profileState,
        setProfile: setProfileState,
        handleProfileClick: handleProfileClick,
      }}
    >
      <div className="app">
        <header></header>
        <nav>
          <div className="tab-container"></div>
          <input
            type="image"
            src={current.profile.picture}
            onClick={handleProfileClick}
            value={current.profile.id}
            className="profile-image"
          />
        </nav>
        <DirectMessages />
        <LogOut />
      </div>
    </ProfileContext.Provider>
  );
};

export default HomePage;
