import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { ProfileContext } from "../HomePage";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import { AuthContext } from "../../../App";
import emailIcon from "../../../assets/icons/email.svg";
import phoneIcon from "../../../assets/icons/phone.svg";
import EditContactInfoModal from "./EditContactInfoModal/EditContactInfoModal";

const Profile = ({ profile, show, setProfilesWereEdited }) => {
  const currentUser = useContext(AuthContext);
  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);
  const [editContactIsOpen, setEditContactIsOpen] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const authorizeEdits = () => {
      setIsCurrentUser(currentUser.user.id === profile.user_id);
    };
    authorizeEdits();
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
        <img src={profile.picture} alt="" className="profile-img" />
        <div className="header-edit">
          <div className="full-name">{profile.name}</div>
          {isCurrentUser && (
            <Link onClick={() => setEditProfileIsOpen(true)}>Edit</Link>
          )}
          <EditProfileModal
            profile={profile}
            open={editProfileIsOpen}
            setEditProfileIsOpen={setEditProfileIsOpen}
            setProfilesWereEdited={setProfilesWereEdited}
          />
        </div>
        <div className="title">{profile.title}</div>
      </div>

      <hr />

      <div className="profile-section">
        <div className="header-edit">
          <span className="profile-section-header">Contact Information</span>
          {isCurrentUser && (
            <Link onClick={() => setEditContactIsOpen(true)}>Edit</Link>
          )}
          <EditContactInfoModal
            profile={profile}
            open={editContactIsOpen}
            setEditContactIsOpen={setEditContactIsOpen}
            setProfilesWereEdited={setProfilesWereEdited}
          />
        </div>
        <div className="contact-field">
          <div className="profile-icons">
            <img src={emailIcon} alt="" />
          </div>
          <div className="contact-text">
            <span>Email address</span>
            <Link>{profile.email}</Link>
          </div>
        </div>
        {profile.phone ? (
          <div className="contact-field">
            <div className="profile-icons">
              <img src={phoneIcon} alt="" />
            </div>
            <div className="contact-text">
              <span>Phone</span>
              <Link>{profile.phone}</Link>
            </div>
          </div>
        ) : (
          isCurrentUser && (
            <div className="contact-field">
              <Link
                className="add-info"
                onClick={() => setEditContactIsOpen(true)}
              >
                + Add Phone
              </Link>
            </div>
          )
        )}
      </div>

      <hr />
      {/* Potential about section in the future */}

      {/* <div className="profile-section">
        <div className="header-edit">
          <span className="profile-section-header">About me</span>
          {isCurrentUser && <Link>Edit</Link>}
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
