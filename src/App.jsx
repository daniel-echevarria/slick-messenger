import "./App.css";
import HomePage from "./components/homePage/homePage";
import { Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const YouContext = createContext(null);

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [you, setYou] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch("http://localhost:3000/current", {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        sessionStorage.removeItem("token");
        setToken(null);
        return;
      }
      const result = await response.json();
      console.log(result.current_user);
      setYou(result.current_user);
    };
    getCurrentUser();
  }, []);

  return (
    <>
      {token ? (
        <YouContext.Provider value={you}>
          <HomePage />
        </YouContext.Provider>
      ) : (
        <Navigate replace to="/signin" />
      )}
    </>
  );
}

export default App;
