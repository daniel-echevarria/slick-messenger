import { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = ({ profile }) => {
  return (
    <div className="profile">
      <div className="profile-section">
        <div className="header-close">
          <h3 className="profile-header">Profile</h3>
          <button className="close-btn">╳</button>
        </div>
        <img src={profile.picture} alt="" />
        <div className="header-edit">
          <div className="full-name">{profile.name}</div>
          <Link>Edit</Link>
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
