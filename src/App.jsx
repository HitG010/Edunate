import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Home from "./Components/Home";
import Landing from "./pages/landing";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
