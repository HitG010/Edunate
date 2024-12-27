import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login.jsx";
import Home from "./Components/Home";
import Landing from "./pages/landing";
import InstituteSignUp from "./Components/InstituteSignUp";
import InstituteLogin from "./pages/instituteLogin.jsx";
import SignupPage from "./pages/Signup";
import OCAuthProvider from "./Components/ocid.jsx";
import RedirectHandler from "./Components/redirectHandler.jsx";
import OcidLogin from "./pages/ocidLogin.jsx";
import ConnectWithOCID from "./pages/Oclogin.jsx";
import UpdateDetails from "./pages/updateDetails.jsx";

const loginSuccess = () => {
  console.log("Login Success");
};

const loginError = () => {
  console.log("Login Error");
};

import UploadInvoice from "./pages/uploadInvoice.jsx";
function App() {
  return (
    <>
      <OCAuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/instLogin" element={<InstituteLogin />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/instSignup" element={<InstituteSignUp />} />
            <Route path="/updateDetails" element={<UpdateDetails />} />
          </Routes>
        </Router>
      </OCAuthProvider>
    </>
  );
}

export default App;
