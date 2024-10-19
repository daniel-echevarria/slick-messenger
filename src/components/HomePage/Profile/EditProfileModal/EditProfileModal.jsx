import CustomInput from "../../../CustomInput/CustomInput";
import "./EditProfileModal.css";
import { useRef, useState } from "react";

const EditProfileModal = ({ profile, open, setEditProfileIsOpen }) => {
  const modal = useRef(null);
  const [fieldValues, setFieldValues] = useState({
    name: profile.name,
    display_name: profile.display_name,
    title: profile.about,
  });

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setFieldValues({ ...fieldValues, name: newName });
  };

  const handleChangeDisplayName = (e) => {
    const newName = e.target.value;
    setFieldValues({ ...fieldValues, display_name: newName });
  };
  const handleChangeTitle = (e) => {
    const newName = e.target.value;
    setFieldValues({ ...fieldValues, title: newName });
  };

  open && modal.current.showModal();

  const handleCloseModal = () => {
    modal.current.close();
    setEditProfileIsOpen(false);
  };

  return (
    <dialog className="edit-profile-modal" ref={modal}>
      <h2>Edit your profile</h2>
      <form action="" className="edit-form">
        <div className="name-fields">
          <CustomInput
            label={"Full name"}
            value={fieldValues.name}
            handleChange={handleChangeName}
          />
          <CustomInput
            label={"Display name"}
            value={fieldValues.display_name}
            handleChange={handleChangeDisplayName}
          />
          <CustomInput
            label={"Title"}
            value={fieldValues.about}
            handleChange={handleChangeTitle}
          />
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
