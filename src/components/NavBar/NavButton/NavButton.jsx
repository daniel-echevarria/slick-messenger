import "./NavButton.css";
const NavButton = ({ icon, text, className }) => {
  return (
    <button className={className}>
      <img src={icon} alt="" className="icon" />
      <span>{text}</span>
    </button>
  );
};

export default NavButton;
