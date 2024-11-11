import { useState } from "react";
import NavButton from "./NavButton/NavButton";

const NavBar = ({ className, tabs, setSelectedTabText }) => {
  const [isSelected, setIsSelected] = useState(0);

  const handleTabSelection = (e) => {
    setIsSelected(e.target.id);
    setSelectedTabText(e.target.id);
  };

  const navButtons = tabs.map((el, index) => {
    return (
      <NavButton
        key={index}
        id={index}
        icon={isSelected == index ? el.iconFilled : el.icon}
        text={el.text}
        onClick={handleTabSelection}
        isSelected={isSelected}
      />
    );
  });

  return <nav className={className}>{navButtons}</nav>;
};

export default NavBar;
