import { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = ({ profile }) => {
  return (
    <div className="profile">
      <h3 className="profile-header">Profile</h3>
      <img src={profile.picture} alt="" />
      <div className="full-name-edit">
        <div className="full-name">{profile.name}</div>
        <Link>Edit</Link>
      </div>
      <div>
        <span>Contact Information</span>
      </div>
    </div>
  );
};

export default Profile;
