import DirectMessages from "./DirectMessages/DirectMessages";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="app">
      <header></header>
      <nav></nav>
      <DirectMessages />
      <div className="conversation"></div>
    </div>
  );
};

export default HomePage;
