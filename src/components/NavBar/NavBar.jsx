import { useState } from "react";
import "./NavBar.css";
import NavButton from "./NavButton/NavButton";
const NavBar = ({ className, tabs, children }) => {
  const [isSelected, setIsSelected] = useState(0);

  const handleTabSelection = (e) => {
    setIsSelected(e.target.index);
  };

  const navButtons = tabs.map((el, index) => {
    return (
      <NavButton
        key={index}
        icon={el.icon}
        text={el.text}
        onClick={handleTabSelection}
        className={index === isSelected ? "nav-btn selected" : "nav-btn"}
      />
    );
  });

  return <nav className={className}>{navButtons || children}</nav>;
};

export default NavBar;
