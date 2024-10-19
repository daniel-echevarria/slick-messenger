import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { ProfileContext } from "../homePage";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import { AuthContext } from "../../../App";

const Profile = ({ profile, show }) => {
  const currentUser = useContext(AuthContext);
  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const hideEdits = () => {
      setIsCurrentUser(currentUser.user.id === profile.user_id);
    };
    hideEdits();
  }, [currentUser.user.id, profile.user_id]);

  const currentProfile = useContext(ProfileContext);

  const closeProfile = () => {
    currentProfile.setProfile({ ...currentProfile.profile, show: false });
  };

  return (
    <div className="profile" style={{ display: show ? "block" : "none" }}>
      <div className="profile-section">
        <div className="header-close">
          <h3 className="profile-header">Profile</h3>
          <button className="close-btn" onClick={closeProfile}>
            ╳
          </button>
        </div>
        <img src={profile.picture} alt="" />
        <div className="header-edit">
          <div className="full-name">{profile.name}</div>
          {isCurrentUser && (
            <Link onClick={() => setEditProfileIsOpen(true)}>Edit</Link>
          )}
          <EditProfileModal
            profile={profile}
            open={editProfileIsOpen}
            setEditProfileIsOpen={setEditProfileIsOpen}
          />
        </div>
      </div>

      <hr />

      <div className="profile-section">
        <div className="header-edit">
          <span className="profile-section-header">Contact Information</span>
          {isCurrentUser && <Link>Edit</Link>}
        </div>
      </div>

      <hr />

      <div className="profile-section">
        <div className="header-edit">
          <span className="profile-section-header">About me</span>
          {isCurrentUser && <Link>Edit</Link>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
