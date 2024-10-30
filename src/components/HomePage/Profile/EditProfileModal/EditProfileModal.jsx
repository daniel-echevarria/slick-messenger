import CustomInput from "../../../CustomInput/CustomInput";
import "./EditProfileModal.css";
import { useEffect, useRef, useState } from "react";
import { DirectUpload } from "activestorage";

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
  const [uploadedFile, setUploadedFile] = useState(null);

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

  useEffect(() => {
    const submitPicture = async () => {
      if (!uploadedFile) return;
      const upload = new DirectUpload(
        uploadedFile,
        `${apiUrl}/rails/active_storage/direct_uploads`
      );
      upload.create(async (error, blob) => {
        if (error) {
          console.error("Upload failed:", error);
        } else {
          const response = await fetch(
            `${apiUrl}/profiles/${profile.id}/update_profile_picture`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ blob_id: blob.signed_id }),
            }
          );
          const result = await response.json();
          console.log(result);
        }
      });
    };
    submitPicture();
  }, [uploadedFile, profile.id]);

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

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
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
            <label htmlFor="fileInput" id="update-photo-btn">
              Upload photo
              <input type="file" onChange={handleFileUpload} id="fileInput" />
            </label>
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
