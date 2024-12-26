import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Home from "./Components/Home";
import Landing from "./pages/landing";
import InstituteSignUp from "./Components/InstituteSignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instLogin" element={<InstituteSignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
