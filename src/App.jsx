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
      const response = await fetch("http://localhost:3000/you", {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        sessionStorage.removeItem("token");
        setToken(null);
        return;
      }
      const result = await response.json();
      setYou(result.current_user);
    };
    getCurrentUser();
  }, [token]);

  console.log(you);
  return (
    <>
      {token ? (
        <YouContext.Provider value={you}>
          <HomePage />
        </YouContext.Provider>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}

export default App;
