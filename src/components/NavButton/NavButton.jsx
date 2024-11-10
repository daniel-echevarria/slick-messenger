import "./NavButton.css";
const NavButton = ({ icon, text }) => {
  return (
    <button>
      <img src={icon} alt="" className="icon" />
      <span>{text}</span>
    </button>
  );
};

export default NavButton;
