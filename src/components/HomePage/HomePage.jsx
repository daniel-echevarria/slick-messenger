import DirectMessages from "./DirectMessages/DirectMessages";
import "./HomePage.css";
import LogOut from "./LogOut/LogOut";
import { AuthContext } from "../../App";
import { createContext, useContext, useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const ProfileContext = createContext(null);

const HomePage = () => {
  const currentUser = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);

  const [profileSectionState, setProfileSectionState] = useState({});
  const [currentUserProfile, setCurrentUserProfile] = useState({
    ...currentUser.profile,
  });

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await fetch(`${apiUrl}/profiles`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const result = await response.json();
          setProfiles(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfiles();
  }, [currentUserProfile]);

  const handleProfileClick = (e) => {
    setProfileSectionState({
      id: e.target.value,
      show: true,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile: profileSectionState,
        setProfile: setProfileSectionState,
        handleProfileClick: handleProfileClick,
      }}
    >
      <div className="app">
        <header></header>
        <nav>
          <div className="tab-container"></div>
          <input
            type="image"
            src={currentUserProfile.avatar}
            value={currentUserProfile.id}
            className="profile-image"
            onClick={handleProfileClick}
          />
        </nav>
        <DirectMessages
          profiles={profiles}
          setCurrentUserProfile={setCurrentUserProfile}
        />
        <LogOut />
      </div>
    </ProfileContext.Provider>
  );
};

export default HomePage;
