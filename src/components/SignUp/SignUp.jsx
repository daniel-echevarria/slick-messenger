import { useState } from "react";
import logo from "../../assets/slack-logo.svg";
import CustomInput from "../CustomInput/CustomInput";

const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleSignUp = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <main>
        <div className="logo-box">
          <img className="logo" src={logo} alt="slack-logo" />
          <span>Slick</span>
        </div>
        <h1>First, enter your email</h1>
        <p>
          We suggest using the <strong> email address you use at work </strong>
        </p>
        <p>{errorMessage}</p>
        <div className="login-box">
          <CustomInput
            type={"text"}
            placeholder={"name@work-email.com"}
            value={emailValue}
            handleChange={handleEmailChange}
          />
          <button onClick={handleSignUp}>Continue</button>
        </div>
      </main>
    </>
  );
};

export default SignUp;
