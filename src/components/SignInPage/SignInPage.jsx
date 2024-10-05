import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/slack-logo.svg";
import CustomInput from "../CustomInput/CustomInput";
import "../SignInPage/SignInPage.css";
import SignInWithGoogle from "./SignInWithGoogle";

const SignInPage = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginData, setLoginData] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(true);

  // Attempt to login the user weather with token or credentials
  useEffect(() => {
    const login = async () => {
      if (!isSubmitted) return;
      const response = await fetch("http://localhost:3000/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(loginData),
      });
      if (response.status === 200) {
        setIsError(false);
        const token = response.headers.get("Authorization");
        sessionStorage.setItem("token", token);
        navigate("/");
      } else {
        sessionStorage.removeItem("token");
        setMessage("Invalid Credentials");
      }
    };
    login();
  }, [loginData, isSubmitted, navigate]);

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
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
        <span>slick</span>
      </div>
      <h1>Sign in to Slick</h1>
      <SignInWithGoogle />
      <div className="break">
        <hr />
        <div id="or">OR</div>
        <hr />
      </div>
      <form action="" onSubmit={handleSignIn} className="login-box">
        <span style={{ color: isError ? "red" : "green" }}>{message}</span>
        <CustomInput
          type={"email"}
          placeholder={"name@work-email.com"}
          value={emailValue}
          handleChange={handleEmailChange}
          required={true}
        />
        <CustomInput
          type={"password"}
          placeholder={"************"}
          value={passwordValue}
          handleChange={handlePasswordChange}
          required={true}
          min={6}
        />
        <button>Sign in</button>
      </form>
      <div className="signup-offer">
        <span>New to Slick?</span>
        <Link to="/signup">Create an account</Link>
      </div>
    </main>
  );
};

export default SignInPage;
