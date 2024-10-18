import "./DirectMessages.css";
import newMsgIcon from "../../../assets/icons/new-msg.svg";
import { createContext, useEffect, useState } from "react";
import Conversation from "./Conversation/Conversation";

export const InterlocutorContext = createContext(null);

const DirectMessages = () => {
  const [profiles, setProfiles] = useState([]);
  const [friendship, setFriendship] = useState(null);
  const [interlocutor, setInterlocutor] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await fetch("http://localhost:3000/profiles", {
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
  }, []);

  useEffect(() => {
    const getFriendship = async () => {
      if (!interlocutor) return;
      try {
        const response = await fetch(`http://localhost:3000/friendships`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ contact_id: interlocutor.user_id }),
        });
        if (response.ok) {
          const result = await response.json();
          setFriendship(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriendship();
  }, [interlocutor]);

  const selectInterlocutor = (e) => {
    const selectedId = Number(e.target.value);
    const selectedProfile = profiles.find(
      (profile) => profile.id == selectedId
    );
    setInterlocutor(selectedProfile);
  };

  const profilesList = profiles.map((profile) => {
    return (
      <div key={profile.id} className="user">
        <button onClick={selectInterlocutor} value={profile.id}>
          <img src={profile.picture} className="avatar-img" />
          {profile.name || profile.email}
        </button>
      </div>
    );
  });

  return (
    <InterlocutorContext.Provider value={interlocutor}>
      <div className="direct-messages">
        <div className="dm-header">
          <h3>Direct Messages</h3>
          <button>
            <img src={newMsgIcon} alt="new-message-icon" className="icon" />
          </button>
        </div>
        <div className="users-list">{profilesList}</div>
      </div>
      <Conversation friendship={friendship} />
    </InterlocutorContext.Provider>
  );
};

export default DirectMessages;
