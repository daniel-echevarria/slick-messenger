import { useContext } from "react";
import "./SelectInterlocutorDropDown.css";
import { InterlocutorContext } from "../../../DirectMessages";

const SelectInterlocutorDropDown = ({ items, show }) => {
  const interlocutorProfile = useContext(InterlocutorContext);

  const ItemsList = items.map((item) => {
    return (
      <button
        key={item.id}
        className="select-interlocutor"
        onClick={interlocutorProfile.setter}
        value={item.id}
      >
        <img src={item.picture} alt="" />
        <span className="display-name">{item.display_name || item.email}</span>
        <span>{item.name}</span>
      </button>
    );
  });

  return show && <div className="drop-down-menu">{ItemsList}</div>;
};

export default SelectInterlocutorDropDown;
