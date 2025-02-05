import React, { useState } from "react";
import axios from "axios";

const InstituteSignUp = () => {
  const [instituteName, setInstituteName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationDocument, setVerificationDocument] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare form data
    const formData = {
      instituteName,
      email,
      password,
      address,
      verificationDocument,
    };
    
    console.log("Form Data:", formData);
    e.target.reset();

    // Send data to the backend
    const sendData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/instituteSignUp",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert(
          "Data submitted successfully! You will be notified once your account is verified."
        );
        console.log("Response:", response.data);
      } catch (err) {
        if(err.response.status === 400) {
            alert("Email already exists!");
        }
        console.error("Error:", err);
      }
    };
    sendData();
    window.location.href = "/instLogin";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Get Started
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#220000" }}
            >
              Institute Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setInstituteName(e.target.value)}
              value={instituteName}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#220000" }}
            >
              Address
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#220000" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#220000" }}
            >
              Verification Document Link
            </label>
            <input
              type="url"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setVerificationDocument(e.target.value)}
              value={verificationDocument}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#220000] text-white py-2 rounded-md hover:bg-[#22000080] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstituteSignUp;
