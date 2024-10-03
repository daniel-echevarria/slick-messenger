import SignInPage from "./components/signInPage/signInPage";
import "./App.css";
import HomePage from "./components/homePage/homePage";

localStorage.clear();
function App() {
  const token = localStorage.getItem("token");

  return <>{token ? <HomePage /> : <SignInPage />}</>;
}

export default App;
