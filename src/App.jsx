import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Home from "./Components/Home";
import Landing from "./pages/landing";
import InstituteSignUp from "./Components/InstituteSignUp";
import InstituteLogin from "./pages/instituteLogin.jsx";
import SignupPage from "./pages/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instLogin" element={<InstituteLogin />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/instSignup" element={<InstituteSignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
