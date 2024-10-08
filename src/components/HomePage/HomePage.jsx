import DirectMessages from "./DirectMessages/DirectMessages";
import "./HomePage.css";
import LogOut from "./LogOut/LogOut";

const HomePage = () => {
  return (
    <div className="app">
      <header></header>
      <nav></nav>
      <DirectMessages />
      <LogOut />
    </div>
  );
};

export default HomePage;
