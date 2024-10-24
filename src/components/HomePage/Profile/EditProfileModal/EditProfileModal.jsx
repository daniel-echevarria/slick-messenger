import CustomInput from "../../../CustomInput/CustomInput";
import "./EditProfileModal.css";
import { useEffect, useRef, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const EditProfileModal = ({
  profile,
  open,
  setEditProfileIsOpen,
  setProfilesWereEdited,
}) => {
  const modal = useRef(null);
  const [save, setSave] = useState(false);
  const [fieldValues, setFieldValues] = useState(null);

  useEffect(() => {
    const updateProfileFields = () => {
      setFieldValues({
        name: profile.name || "",
        display_name: profile.display_name || "",
        title: profile.title || "",
      });
    };
    updateProfileFields();
  }, [profile]);

  useEffect(() => {
    if (!save) return;
    const saveChanges = async () => {
      const response = await fetch(`${apiUrl}/profiles/${profile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldValues),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setProfilesWereEdited(true);
      } else {
        console.log("problem when updating the profile");
      }
      setSave(false);
    };
    saveChanges();
  }, [save, fieldValues, profile.id, setProfilesWereEdited]);

  open && modal.current.showModal();

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setFieldValues({ ...fieldValues, name: newName });
  };

  const handleChangeDisplayName = (e) => {
    const newName = e.target.value;
    setFieldValues({ ...fieldValues, display_name: newName });
  };
  const handleChangeTitle = (e) => {
    const newTitle = e.target.value;
    setFieldValues({ ...fieldValues, title: newTitle });
  };

  const handleCloseModal = () => {
    modal.current.close();
    setEditProfileIsOpen(false);
  };

  const handleSaveChanges = () => {
    setSave(true);
    handleCloseModal();
  };

  return (
    fieldValues && (
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
              value={fieldValues.title}
              handleChange={handleChangeTitle}
            />
          </div>
          <div className="profile-photo-field">
            <span>Profile photo</span>
            <img src={profile.picture} alt="" className="profile-img" />
            <button id="update-photo-btn">Update Photo</button>
          </div>
        </form>
        <div className="edit-form-buttons">
          <button onClick={handleCloseModal}>Cancel</button>
          <button className="confirm" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </dialog>
    )
  );
};

export default EditProfileModal;
