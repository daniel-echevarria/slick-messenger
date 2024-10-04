import { useEffect, useState } from "react";
import logo from "../../assets/slack-logo.svg";
import CustomInput from "../CustomInput/CustomInput";

const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signUpData, setSignUpData] = useState(null);

  useEffect(() => {
    if (!isSubmitted) return;
    const createUser = async () => {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      const result = await response.json();
      console.log(result);
    };
    createUser();
  }, [signUpData]);

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmitted = () => {
    setSignUpData({
      user: {
        email: emailValue,
        password: passwordValue,
      },
    });
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
            type={"email"}
            placeholder={"name@work-email.com"}
            value={emailValue}
            handleChange={handleEmailChange}
          />
          <CustomInput
            type={"password"}
            placeholder={"********"}
            value={passwordValue}
            handleChange={handlePasswordChange}
          />
          <button onClick={handleSubmitted}>Continue</button>
        </div>
      </main>
    </>
  );
};

export default SignUp;
