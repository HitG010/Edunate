import react from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { ethers } from "ethers";
// import { Web3Provider } from "@ethersproject/providers";
import Edunate from '../artifacts/contracts/Edunate.sol/Edunate.json';
import { connectMetamask } from "../APIs/blockchain";

const Navbar = () => {
  const { ocAuth } = useOCAuth();
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const [account, setAccount] = useState("");

//   async function connectMetamask() {
//     if (window.ethereum) {
//       const isBrowser = typeof window !== "undefined";
//       const newProvider = isBrowser
//         ? new ethers.BrowserProvider(window.ethereum)
//         : null;

//       // Request wallet connection and get account details
//       await newProvider.send("eth_requestAccounts", []);
//       const signer = newProvider.getSigner();
//       const res = await (await signer).getAddress();
//       setAccount(res);
//     //   console.log(account);

//       // Load contract
//       const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//       const newContract = new ethers.Contract(
//         contractAddress,
//         Edunate.abi,
//         signer
//       );
//     //   contractGlobal = newContract;

//       console.log("Connected account:", account);
//       console.log("Contract:", newContract);
//     } else {
//       console.error('Ethereum object not found, install MetaMask.');
//       alert('MetaMask not installed! Please install MetaMask to continue.');
//     }
//     }

  // retrive the userType form localstorage
  useEffect(() => {
    setUserType(localStorage.getItem("role"));
  }, []);

  const handleOCID = async () => {
    try {
      if (userType === "student") {
        console.log("student");
        await ocAuth.signInWithRedirect({ state: "student" });
      } else if (userType === "institute") {
        await ocAuth.signInWithRedirect({ state: "institute" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-between items-center mx-8">
      <div className="text-3xl font-bold">Edunate</div>
      <div className="flex gap-4">
        <button
          onClick={() => {
            window.location.href = "/connectWithOCID";
          }}
          className="flex gap-2 px-4 py-2 text-[#220000] rounded-md font-semibold text-xl mt-6 border-2 border-[#220000]"
        >
          Connect with OCID
        </button>
        <button
          onClick={connectMetamask}
          className="flex gap-2 px-4 py-2 text-[#220000] rounded-md font-semibold text-xl mt-6 border-2 border-[#220000]"
        >
          <img
            src="https://freelogopng.com/images/all_img/1683020955metamask-icon-png.png"
            className="w-6 h-6 mr-2"
            alt="Metamask"
          />
          Connect to Metamask
        </button>
        <button
          onClick={() => {
            window.location.href = "http://localhost:5000/logout";
          }}
          className="px-4 py-2 bg-[#252525] text-[#f1f3f5] rounded-full font-semibold text-xl mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
