import "./SignUp.css";
import { useEffect, useState } from "react";
import logo from "../../assets/slack-logo.svg";
import CustomInput from "../CustomInput/CustomInput";
import { useNavigate, Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passConfirmationValue, setPassConfirmationValue] = useState("");
  const [signUpData, setSignUpData] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  useEffect(() => {
    if (!signUpData) return;
    const createUser = async () => {
      setIsCreatingUser(true);
      try {
        const response = await fetch(`${apiUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        });
        const result = await response.json();
        if (response.status >= 400) throw new Error(result.message);
        setSuccessMessage(result.message);
        navigate("/");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsCreatingUser(false);
        setSignUpData(null);
      }
    };
    createUser();
  }, [signUpData, navigate]);

  const handleSubmitted = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (passwordValue !== passConfirmationValue) {
      setErrorMessage(
        "User couldn't be created successfully. Passwords don't match"
      );
      return;
    }
    setSignUpData({
      user: {
        email: emailValue,
        password: passwordValue,
      },
    });
  };

  return (
    <>
      <main>
        <div className="logo-box">
          <img className="logo" src={logo} alt="slack-logo" />
          <span>slick</span>
        </div>
        <h1>First, enter your email & password</h1>
        <p>
          We suggest using the <strong> email address you use at work </strong>
        </p>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form action="" onSubmit={handleSubmitted} className="login-box">
          <CustomInput
            name={"email"}
            type={"email"}
            placeholder={"name@work-email.com"}
            value={emailValue}
            handleChange={(e) => setEmailValue(e.target.value)}
            required={true}
          />
          <CustomInput
            name={"password"}
            type={"password"}
            placeholder={"********"}
            value={passwordValue}
            handleChange={(e) => setPasswordValue(e.target.value)}
            min={6}
            required={true}
          />
          <CustomInput
            name={"password-confirmation"}
            type={"password"}
            placeholder={"********"}
            value={passConfirmationValue}
            handleChange={(e) => setPassConfirmationValue(e.target.value)}
            min={6}
            required={true}
          />
          {isCreatingUser ? (
            <button disabled={true}> Creating User...</button>
          ) : (
            <button>Create Account</button>
          )}
        </form>
        <div className="back-to-signin">
          <p>Already using Slick?</p>
          <Link to={"/signin"}>Sign in to an existing account</Link>
        </div>
      </main>
    </>
  );
};

export default SignUp;
