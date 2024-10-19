import CustomInput from "../../../CustomInput/CustomInput";
import "./EditProfileModal.css";
import { useRef } from "react";

const EditProfileModal = ({ open }) => {
  const modal = useRef(null);

  if (open) modal.current.showModal();

  return (
    <dialog className="edit-profile-modal" ref={modal}>
      <form action="">
        <CustomInput />
      </form>
    </dialog>
  );
};

export default EditProfileModal;
