import React, { useState, useEffect } from "react";
import { getUserDetails } from "../APIs/userDetails";
import Navbar from "./nav";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import axios from "axios";

function Home() {
  const { ocAuth } = useOCAuth();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        if (userDetails) {
          setUser(userDetails);
        }
        // console.log("User Institution:", user.institute);
        if (role === "institution" && user.role === "Student") {
          window.location.href = "/updateDetails";
        } else if (
          (role === "student" || role === "alumni") &&
          user.institute === undefined
        ) {
          window.location.href = "/updateDetails";
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch and store role
  useEffect(() => {
    const fetchAndStoreRole = async () => {
      try {
        const storedRole = localStorage.getItem("role");
        if (storedRole) {
          setRole(storedRole);

          // Send role and user details to the backend
          if (user) {
            const response = await axios.post(
              "http://localhost:5000/storeRole",
              { role: storedRole, user },
              { withCredentials: true }
            );
            console.log("Backend response:", response.data);
          }
        }
      } catch (err) {
        console.error("Error storing role:", err);
      }
    };

    // Only run when user details are available
    if (user) {
      fetchAndStoreRole();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-32">
        <div className="flex justify-between w-[64%]">
          <div className="flex flex-col gap-2">
            <div className="text-2xl">Hi, {user.username} 👋</div>
            <div className="text-5xl font-medium">Dashboard</div>
            <div className="text-lg">Role: {role}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
