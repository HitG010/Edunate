import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Home from "./Components/Home";
import Landing from "./pages/landing";
import InstituteSignUp from "./Components/InstituteSignUp";
import InstituteLogin from "./pages/instituteLogin.jsx";
import SignupPage from "./pages/Signup";
import OCAuthProvider from './Components/ocid.jsx';
import RedirectHandler from "./Components/redirectHandler.jsx";
import OcidLogin from "./pages/ocidLogin.jsx";
import ConnectWithOCID from "./pages/Oclogin.jsx";


const loginSuccess =() => {
  console.log("Login Success");
}

const loginError = () => {
  console.log("Login Error");
}

function App() {
  return (
    <>
    <OCAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instLogin" element={<InstituteLogin />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/instSignup" element={<InstituteSignUp />} />
          {/* <Route path="/redirect" element={<RedirectHandler/>} /> */}
          <Route path="/redirect" element={<OcidLogin />} />
          <Route path="/connectWithOCID" element={<ConnectWithOCID />} />
        </Routes>
      </Router>
      </OCAuthProvider>
    </>
  );
}

export default App;
