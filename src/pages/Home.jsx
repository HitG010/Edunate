import React, { useState, useEffect } from "react";
import { getUserDetails } from "../APIs/userDetails";
import Navbar from "../Components/nav";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import axios from "axios";
import InstituteHome from "../Components/instituteHome";
import StudentHome from "../Components/studentHome";
import AlumniHome from "../Components/alumniHome";
import {
  connectMetamask,
  donate,
  getUserAccount,
  getContract,
  makePayment,
  sendMilestonePayment,
} from "../APIs/blockchain";
import { ethers } from "ethers";
import Edunate from "../artifacts/contracts/Edunate.sol/Edunate.json";

function Home() {
  const { ocAuth } = useOCAuth();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        if (userDetails) {
          setUser(userDetails);
        }
        console.log("User Details:", userDetails);
        console.log("User Institution:", user.institute);
        if (role === "institution" && user.role === "Student") {
          window.location.href = "/updateDetails";
        } else if (
          (role === "student" || role === "alumni") &&
          !user.institute
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
  }, [role]);

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

  const getSigner = async () => {
    if (window.ethereum) {
      const isBrowser = typeof window !== "undefined";
      const newProvider = isBrowser
        ? new ethers.BrowserProvider(window.ethereum)
        : null;

      // Request wallet connection and get account details
      await newProvider.send("eth_requestAccounts", []);
      const signer = newProvider.getSigner();
      const res = await (await signer).getAddress();
      setAccount(res);
      setSigner(signer);
      console.log("Connected account:", res);

      // Load contract
      const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const newContract = new ethers.Contract(
        contractAddress,
        Edunate.abi,
        signer
      );
      setContract(newContract);
      console.log("Contract:", newContract);

      // return { account: res, contract: newContract };
    } else {
      console.error("Ethereum object not found, install MetaMask.");
      alert("MetaMask not installed! Please install MetaMask to continue.");
    }
  };

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
        {/* <button className="px-4 py-2 bg-[#252525] text-[#f1f3f5] rounded-full font-semibold text-xl mt-6"
        onClick={async ()=>{
          const fundraiserId = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
          connectMetamask();
        //   getSigner();
        //   const user = getUserAccount();
        //  getContract();
        //   // console.log(user, contract);
        //   const res = await donate(fundraiserId);
        //   console.log(res);
        const res = await donate();
        console.log(res);
        }}>
          Donate
        </button>
        <button className="px-4 py-2 bg-[#252525] text-[#f1f3f5] rounded-full font-semibold text-xl mt-6"
        onClick={async ()=>{

          const addr = getUserAccount();
          console.log(addr);
          const res = await sendMilestonePayment(addr);
          console.log(res);
        }
        }>
          Send Milestone Payment
        </button> */}
        {/* <button onClick={() => connectMetamask()}>Test button</button> */}
        <div className="flex flex-col gap-4 mt-8 w-[64%]">
          {role === "institution" && <InstituteHome id={user._id} />}
          {role === "student" && (
            <StudentHome id={user._id} institutionId={user.institute} />
          )}
          {role === "alumni" && <AlumniHome id={user.institute} />}
        </div>
      </div>
    </>
  );
}

export default Home;
