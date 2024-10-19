import CustomInput from "../../../CustomInput/CustomInput";
import "./EditProfileModal.css";
import { useRef } from "react";

const EditProfileModal = ({ open, setEditProfileIsOpen }) => {
  const modal = useRef(null);

  if (open) modal.current.showModal();

  const handleCloseModal = () => {
    modal.current.close();
    setEditProfileIsOpen(false);
  };

  return (
    <dialog className="edit-profile-modal" ref={modal}>
      <button onClick={handleCloseModal}>╳</button>
      <form action="">
        <CustomInput />
      </form>
    </dialog>
  );
};

export default EditProfileModal;
