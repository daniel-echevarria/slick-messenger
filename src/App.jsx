import "./App.css";
import HomePage from "./components/homePage/homePage";
import { Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
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
      console.log(result);
      setCurrent({
        user: result.current_user,
        profile: result.profile,
      });
    };
    getCurrentUser();
  }, []);

  return (
    <>
      {token ? (
        <AuthContext.Provider value={current}>
          {current && <HomePage />}
        </AuthContext.Provider>
      ) : (
        <Navigate replace to="/signin" />
      )}
    </>
  );
}

export default App;
