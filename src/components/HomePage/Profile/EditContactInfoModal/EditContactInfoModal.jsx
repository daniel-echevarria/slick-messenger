import CustomInput from "../../../CustomInput/CustomInput";
import "./EditContactInfoModal.css";
import { useEffect, useRef, useState } from "react";

const EditContactInfoModal = ({
  profile,
  open,
  setEditContactIsOpen,
  setProfilesWereEdited,
}) => {
  const modal = useRef(null);
  const [save, setSave] = useState(false);
  const [fieldValues, setFieldValues] = useState(null);

  useEffect(() => {
    const updateProfileFields = () => {
      setFieldValues({
        email: profile.email || "",
        phone: profile.phone || "",
      });
    };
    updateProfileFields();
  }, [profile]);

  useEffect(() => {
    if (!save) return;
    const saveChanges = async () => {
      const response = await fetch(
        `http://localhost:3000/profiles/${profile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fieldValues),
        }
      );
      if (response.ok) {
        const result = await response.json();
        setProfilesWereEdited(true);
        console.log(result);
      } else {
        const result = await response.json();
        console.log(result);
      }
      setSave(false);
    };
    saveChanges();
  }, [save, fieldValues, profile.id, setProfilesWereEdited]);

  open && modal.current.showModal();

  const handleChangePhone = (e) => {
    const newPhone = e.target.value;
    setFieldValues({ ...fieldValues, phone: newPhone });
  };

  const handleCloseModal = () => {
    modal.current.close();
    setEditContactIsOpen(false);
  };

  const handleSaveChanges = () => {
    setSave(true);
    handleCloseModal();
  };

  return (
    fieldValues && (
      <dialog className="edit-profile-modal " ref={modal}>
        <h2>Edit your contact information</h2>
        <form action="" className="edit-form">
          <div className="name-fields">
            <CustomInput
              label={"🔒 Email"}
              value={fieldValues.email}
              disabled={true}
            />
            <CustomInput
              label={"Phone"}
              value={fieldValues.phone}
              handleChange={handleChangePhone}
            />
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

export default EditContactInfoModal;
