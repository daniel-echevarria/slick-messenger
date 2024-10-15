import "./DirectMessages.css";
import newMsgIcon from "../../../assets/icons/new-msg.svg";
import { useEffect, useState } from "react";
import Conversation from "./Conversation/Conversation";

const DirectMessages = () => {
  const [users, setUsers] = useState([]);
  const [interlocutor, setInterlocutor] = useState({ name: "", id: "" });
  const [friendship, setFriendship] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const result = await response.json();
          setUsers(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getFriendship = async () => {
      try {
        const response = await fetch(`http://localhost:3000/friendships`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ contact_id: interlocutor.id }),
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
    setInterlocutor(users.find((user) => user.id == e.target.value));
  };

  const usersList = users.map((user) => {
    return (
      <div key={user.id} className="user">
        <button onClick={selectInterlocutor} value={user.id}>
          <img src={user.avatar_url} className="avatar-img" />
          {user.name || user.email}
        </button>
      </div>
    );
  });

  return (
    <>
      <div className="direct-messages">
        <div className="dm-header">
          <h3>Direct Messages</h3>
          <button>
            <img src={newMsgIcon} alt="new-message-icon" className="icon" />
          </button>
        </div>
        <div className="users-list">{usersList}</div>
      </div>
      <Conversation interlocutor={interlocutor} friendship={friendship} />
    </>
  );
};

export default DirectMessages;
