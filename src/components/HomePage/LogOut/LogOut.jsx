import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogOut.css";
const apiUrl = import.meta.env.VITE_API_URL;

const LogOut = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logOutUser = async () => {
      if (!isSignedOut) return;
      const response = await fetch(`${apiUrl}/sign_out`, {
        method: "DELETE",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const result = await response.json();
        sessionStorage.removeItem("token");
        navigate("signin");
      } else {
        console.error("Failed to log out:", response.statusText); // Log error if logout fails
      }
    };
    logOutUser();
  }, [isSignedOut, navigate]);

  const handleSignOut = () => {
    setIsSignedOut(true);
  };

  return (
    <>
      <button className="sign-out" onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  );
};

export default LogOut;
