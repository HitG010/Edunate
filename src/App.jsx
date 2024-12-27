import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login.jsx";
import Home from "./Components/Home";
import Landing from "./pages/landing";
import InstituteSignUp from "./Components/InstituteSignUp";
import InstituteLogin from "./pages/instituteLogin.jsx";
import SignupPage from "./pages/Signup";
import UploadInvoice from "./pages/uploadInvoice.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instLogin" element={<InstituteLogin />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/instSignup" element={<InstituteSignUp />} />
          <Route path="/upload" element={<UploadInvoice />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
