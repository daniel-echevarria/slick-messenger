const NavButton = ({ icon, text, onClick, id, selectedTabId }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={selectedTabId == id ? "nav-button selected" : "nav-button"}
    >
      <img src={icon} alt="" className="icon" />
      <span>{text}</span>
    </button>
  );
};

export default NavButton;
