import { useState } from "react";
import SignInPage from "./components/signInPage/signInPage";
import "./App.css";
import HomePage from "./components/homePage/homePage";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  console.log(signedIn);

  return (
    <>{signedIn ? <HomePage /> : <SignInPage setSignedIn={setSignedIn} />}</>
  );
}

export default App;
