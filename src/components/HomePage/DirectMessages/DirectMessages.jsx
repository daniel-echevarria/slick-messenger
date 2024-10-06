import "./DirectMessages.css";
import newMsgIcon from "../../../assets/icons/new-msg.svg";
import { useEffect, useState } from "react";

const DirectMessages = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (response.ok) {
          console.log("peak");
          const result = await response.json();
          setUsers(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const usersList = users.map((user) => {
    return (
      <div key={user.id} className="user">
        <button>{user.name || user.email}</button>
      </div>
    );
  });

  return (
    <div className="direct-messages">
      <div className="dm-header">
        <h3>Direct Messages</h3>
        <button>
          <img src={newMsgIcon} alt="new-message-icon" className="icon" />
        </button>
      </div>
      <div className="users-list">{usersList}</div>
    </div>
  );
};

export default DirectMessages;
