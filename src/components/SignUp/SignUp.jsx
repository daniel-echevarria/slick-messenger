import { useEffect, useState } from "react";
import logo from "../../assets/slack-logo.svg";
import CustomInput from "../CustomInput/CustomInput";

const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passConfirmationValue, setPassConfirmationValue] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(true);
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
      if (result.status.code === 200) setIsError(false);
      setMessage(result.status.message);
    };
    createUser();
  }, [signUpData, isSubmitted]);

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handlePassConfirmationChange = (e) => {
    setPassConfirmationValue(e.target.value);
  };

  const handleSubmitted = (e) => {
    e.preventDefault();
    setMessage("");
    if (passwordValue !== passConfirmationValue) {
      setMessage("Passwords don't match");
      return;
    }
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
        <h1>First, enter your email & password</h1>
        <p>
          We suggest using the <strong> email address you use at work </strong>
        </p>
        <form action="" onSubmit={handleSubmitted}>
          <p
            className="form-message"
            style={{ color: isError ? "red" : "green" }}
          >
            {message}
          </p>
          <div className="login-box">
            <CustomInput
              name={"email"}
              type={"email"}
              placeholder={"name@work-email.com"}
              value={emailValue}
              handleChange={handleEmailChange}
              required={true}
            />
            <CustomInput
              name={"password"}
              type={"password"}
              placeholder={"********"}
              value={passwordValue}
              handleChange={handlePasswordChange}
              required={true}
            />
            <CustomInput
              name={"password-confirmation"}
              type={"password"}
              placeholder={"********"}
              value={passConfirmationValue}
              handleChange={handlePassConfirmationChange}
              required={true}
            />
            <button>Create Account</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default SignUp;
