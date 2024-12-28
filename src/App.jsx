import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login.jsx";
import Home from "./pages/Home.jsx";
import Landing from "./pages/landing";
import InstituteSignUp from "./Components/InstituteSignUp";
import InstituteLogin from "./pages/instituteLogin.jsx";
import SignupPage from "./pages/Signup";
import OCAuthProvider from "./Components/ocid.jsx";
import RedirectHandler from "./Components/redirectHandler.jsx";
import OcidLogin from "./pages/ocidLogin.jsx";
import ConnectWithOCID from "./pages/Oclogin.jsx";
import UpdateDetails from "./pages/updateDetails.jsx";
import Admin from "./pages/Admin.jsx";
// import UploadInvoice from "./pages/uploadInvoice.jsx";
import UploadInvoice from "./pages/uploadInvoice.jsx";
import Fundraiser from "./pages/fundraiser.jsx";

const loginSuccess = () => {
  console.log("Login Success");
};

const loginError = () => {
  console.log("Login Error");
};

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
            <Route path="/redirect" element={<RedirectHandler />} />
            <Route path="/ocidLogin" element={<OcidLogin />} />
            <Route path="/connectWithOCID" element={<ConnectWithOCID />} />
            <Route path="/uploadInvoice" element={<UploadInvoice />} />
            <Route path="/fundraiser/:id" element={<Fundraiser />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </OCAuthProvider>
    </>
  );
}

export default App;
