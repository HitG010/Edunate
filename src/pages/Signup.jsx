import React from "react";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Sign Up
        </h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#220000" }}
            >
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
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
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>
          <p className="w-full text-center">or</p>
          <button
            onClick = {() => {window.location.href = "http://localhost:5000/auth/google";}}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Continue with Google
          </button>
        <p className="text-sm mt-4" style={{ color: "#220000" }}>
          Already have an account?{" "}
          <button
            onClick={() => {
                window.location.href = "/login";
            }}
            className="text-gray-700 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
