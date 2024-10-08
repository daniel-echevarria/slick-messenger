import { useEffect, useState } from "react";
import "./LogOut.css";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logOutUser = async () => {
      if (!isSignedOut) return;
      const response = await fetch("http://localhost:3000/sign_out", {
        method: "DELETE",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
      if (response.ok) {
        sessionStorage.removeItem("token");
        navigate("signin");
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
