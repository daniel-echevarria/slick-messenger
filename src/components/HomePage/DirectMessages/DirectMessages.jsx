import "./DirectMessages.css";
import newMsgIcon from "../../../assets/icons/new-msg.svg";
import { useEffect, useState } from "react";

const DirectMessages = () => {
  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [friendshipId, setFriendshipId] = useState(null);

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
          body: JSON.stringify({ contact_id: selectedContact }),
        });
        if (response.ok) {
          const result = await response.json();
          setFriendshipId(result.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriendship();
  }, [selectedContact]);

  useEffect(() => {
    const getConversation = async () => {
      console.log(friendshipId);
      try {
        const response = await fetch(`http://localhost:3000/conversations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ friendship_id: friendshipId }),
        });
        if (response.ok) {
          console.log(response);
          const result = await response.json();
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [friendshipId]);

  const handleGetConversation = (e) => {
    setSelectedContact(e.target.value);
  };

  const usersList = users.map((user) => {
    return (
      <div key={user.id} className="user">
        <button onClick={handleGetConversation} value={user.id}>
          {user.name || user.email}
        </button>
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
