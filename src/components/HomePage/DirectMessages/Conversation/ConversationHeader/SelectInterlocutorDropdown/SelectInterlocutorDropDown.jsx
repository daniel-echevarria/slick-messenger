import "./SelectInterlocutorDropDown.css";

import { useContext } from "react";
import { InterlocutorContext } from "../../../DirectMessages";

const SelectInterlocutorDropDown = ({ items }) => {
  const interlocutorProfile = useContext(InterlocutorContext);

  const ItemsList = items.map((item) => {
    return (
      <button
        key={item.id}
        className="select-interlocutor"
        onClick={interlocutorProfile.setter}
        value={item.id}
      >
        <img src={item.avatar} alt="" />
        <span className="display-name">{item.display_name || item.email}</span>
        <span>{item.name}</span>
      </button>
    );
  });

  return <div className="drop-down-menu">{ItemsList}</div>;
};

export default SelectInterlocutorDropDown;
