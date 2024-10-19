import { useContext, useRef, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { ProfileContext } from "../homePage";
import EditProfileModal from "./EditProfileModal/EditProfileModal";

const Profile = ({ profile, show }) => {
  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);
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
          <Link onClick={() => setEditProfileIsOpen(true)}>Edit</Link>
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
          <Link>Edit</Link>
        </div>
      </div>

      <hr />

      <div className="profile-section">
        <div className="header-edit">
          <span className="profile-section-header">About me</span>
          <Link>Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
