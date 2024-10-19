import CustomInput from "../../../CustomInput/CustomInput";
import "./EditProfileModal.css";
import { useRef } from "react";

const EditProfileModal = ({ profile, open, setEditProfileIsOpen }) => {
  const modal = useRef(null);
  open && modal.current.showModal();

  const handleCloseModal = () => {
    modal.current.close();
    setEditProfileIsOpen(false);
  };

  console.log(profile);

  return (
    <dialog className="edit-profile-modal" ref={modal}>
      <h2>Edit your profile</h2>
      <form action="" className="edit-form">
        <div className="name-fields">
          <CustomInput label={"Full name"} value={profile.name} />
          <CustomInput label={"Display name"} value={profile.display_name} />
          <CustomInput label={"Title"} value={profile.about} />
        </div>
        <div className="profile-photo-field">
          <span>Profile photo</span>
          <img src={profile.picture} alt="" />
          <button id="update-photo-btn">Update Photo</button>
        </div>
      </form>
      <div className="edit-form-buttons">
        <button onClick={handleCloseModal}>Cancel</button>
        <button className="confirm">Save Changes</button>
      </div>
    </dialog>
  );
};

export default EditProfileModal;
