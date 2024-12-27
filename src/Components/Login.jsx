import axios from "axios";
import React from "react";
import { CgGoogle } from "react-icons/cg";

const studentLogin = async () => {
  localStorage.setItem("role", "student");
  window.location.href = `http://localhost:5000/auth/google`;
};

const alumniLogin = async () => {
  localStorage.setItem("role", "alumni");
  window.location.href = `http://localhost:5000/auth/google`;
};

const institutionLogin = async () => {
  localStorage.setItem("role", "institution");
  window.location.href = `http://localhost:5000/auth/google`;
};

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Get Started with Google Sign In
        </h1>
        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={studentLogin}
            className="flex gap-2 justify-center items-center w-full text-[#220000] font-semibold py-2 rounded-md text-[#f0f0f0] bg-[#220000] hover:bg-[#22000095] transition mb-2 text-nowrap px-4"
          >
            <CgGoogle className="w-5 h-5" /> Sign In as Student
          </button>
          <button
            onClick={alumniLogin}
            className="flex gap-2 justify-center items-center w-full font-semibold py-2 rounded-md text-[#f0f0f0] bg-[#220000] hover:bg-[#22000095] transition mb-2 text-nowrap px-4"
          >
            <CgGoogle className="w-5 h-5" /> Sign In as Alumni
          </button>
          <button
            onClick={institutionLogin}
            className="flex gap-2 justify-center items-center w-full text-[#220000] font-semibold py-2 rounded-md text-[#f0f0f0] bg-[#220000] hover:bg-[#22000095] transition text-nowrap px-4"
          >
            <CgGoogle className="w-5 h-5" /> Sign In as Institution
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
