import React from "react";
import { CgGoogle } from "react-icons/cg";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Get Started
        </h1>
        <button
          onClick={() => {
            window.location.href = "http://localhost:5000/auth/google";
          }}
          className="flex gap-2 justify-center items-center w-full text-[#220000] font-semibold py-2 rounded-md border border-[#220000] hover:bg-[#22000010] transition"
        >
          <CgGoogle className="w-5 h-5"/> Continue with Google
        </button>
        <p className="w-full text-center">or</p>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#220000" }}
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#220000" }}
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#220000] text-white py-2 rounded-md hover:bg-[#22000080] transition"
          >
            Login/Register
          </button>
        </form>
        
        {/* <p className="text-sm mt-4" style={{ color: "#220000" }}>
          Don't have an account?{" "}
          <button
            onClick={()=>{
              window.location.href = "/signup";
            }}
            className="text-[#220000] font-bold hover:underline"
          >
            Sign Up
          </button>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
