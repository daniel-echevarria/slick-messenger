import { useState, useEffect, useSyncExternalStore } from "react";
import logo from "../../assets/slack-logo.svg";
import CustomInput from "../CustomInput/CustomInput";
import "../SignInPage/signInPage.css";
import { redirect, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginData, setLoginData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Attempt to login the user weather with token or credentials
  useEffect(() => {
    const login = async () => {
      if (!isSubmitted) return;
      try {
        const response = await fetch("http://localhost:3000/sign_in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(loginData),
        });
        if (response.ok) {
          const token = response.headers.get("Authorization");
          localStorage.setItem("token", token);
          navigate("home");
        } else {
          localStorage.removeItem("token");
          throw new Error("Invalid Credentials");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    login();
  }, [loginData, isSubmitted]);

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSignIn = () => {
    setLoginData({
      user: {
        email: emailValue,
        password: passwordValue,
      },
    });
    setIsSubmitted(true);
  };

  return (
    <main>
      <div className="logo-box">
        <img className="logo" src={logo} alt="slack-logo" />
        <span>Slick</span>
      </div>
      <h1>Sign in to Slick</h1>
      <p>{errorMessage}</p>
      <div className="login-box">
        <CustomInput
          type={"text"}
          placeholder={"name@work-email.com"}
          value={emailValue}
          handleChange={handleEmailChange}
        />
        <CustomInput
          type={"password"}
          placeholder={"************"}
          value={passwordValue}
          handleChange={handlePasswordChange}
        />
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </main>
  );
};

export default SignInPage;
