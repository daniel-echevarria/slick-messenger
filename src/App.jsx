import "./App.css";
import HomePage from "./components/homePage/homePage";
import { Navigate } from "react-router-dom";

function App() {
  const token = sessionStorage.getItem("token");

  return <>{token ? <HomePage /> : <Navigate to="/signin" />}</>;
}

export default App;
