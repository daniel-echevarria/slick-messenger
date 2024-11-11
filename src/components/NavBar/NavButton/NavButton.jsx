const NavButton = ({ icon, text, onClick, id, isSelected }) => {
  return (
    <button
      className={isSelected == id ? "nav-button selected" : "nav-button"}
      onClick={onClick}
      id={id}
    >
      <img src={icon} alt="" className="icon" />
      <span>{text}</span>
    </button>
  );
};

export default NavButton;
