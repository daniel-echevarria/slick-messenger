import { useState } from "react";
import NavButton from "./NavButton/NavButton";

const NavBar = ({ className, children, setSelectedTabId, selectedTabId }) => {
  const handleTabSelection = (e) => {
    setSelectedTabId(e.target.id);
  };

  const navButtons = children.map((el, index) => {
    return (
      <NavButton
        key={index}
        id={index}
        icon={selectedTabId == index ? el.iconFilled : el.icon}
        text={el.text}
        onClick={handleTabSelection}
        selectedTabId={selectedTabId}
      />
    );
  });

  return <nav className={className}>{navButtons}</nav>;
};

export default NavBar;
