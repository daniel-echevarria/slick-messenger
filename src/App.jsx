import "./App.css";
import HomePage from "./components/homePage/homePage";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch("http://localhost:3000/users", {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        sessionStorage.removeItem("token");
        setToken(null);
      }
    };
    getCurrentUser();
  }, [token]);

  return <>{token ? <HomePage /> : <Navigate to="/signin" />}</>;
}

export default App;
