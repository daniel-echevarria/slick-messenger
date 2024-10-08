import "./App.css";
import HomePage from "./components/homePage/homePage";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        sessionStorage.removeItem("token");
      }
    };
    getCurrentUser();
  }, []);

  return <>{token ? <HomePage /> : <Navigate to="/signin" />}</>;
}

export default App;
