import React from "react";
import { useState, useEffect } from "react";
import { OCConnect } from "@opencampus/ocid-connect-js";
import {storeOCdeets, getUserDetails} from "../APIs/userDetails";


const ConnectWithOCID = () => {
    const [openCampusID, setOpenCampusID] = useState("");
    const [walletAdd, setWalletAdd] = useState("");
    const handleSubmit = async () => {
           console.log(openCampusID, walletAdd);
           //fecth user from the server
            const user = await getUserDetails();
            //store the user details
            storeOCdeets(openCampusID, walletAdd, user);
            alert("Open Campus details stored successfully");
            setOpenCampusID("");
            setWalletAdd("");
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetails = await getUserDetails();
            if (userDetails.openCampusId && userDetails.walletAddress) {
                alert("You have already connected with OCID");
                window.location.href = "/home";
            }
        };
        fetchUserDetails();
    });

    return (
        <div className="flex flex-col items-center mt-32">
        <div className="w-[64%]">
            <button onClick={() => {
                window.location.href = "/home";
            }} className="flex gap-2 px-4 py-1 text-[#220000] rounded-md font-semibold text-md mb-6 hover:bg-[#22000010]">
                Go to Home
            </button>
            <div>
                    <div className="text-3xl font-bold mb-4">Connect with OCID</div>
                    <div className="text-lg font-medium mb-2">
                        If you don't already have a Open Cmapus ID, Claim yours <a href="https://id.opencampus.xyz" className="text-blue underline" target="_blank">here</a>
                    </div>
                    <div className="text-lg font-medium mb-4">
                        If you have an account already, enter your Open Campus ID domain and wallet address to connect!
                    </div>
                    <div className="mb-4">
                        <label htmlFor="openCampusID" className="text-lg font-medium">Open Campus ID Domain</label>
                        <input type="text" name="openCampusID" id="openCampusID" className="border-2 border-gray-300 rounded-md p-2 w-full mt-1" value={openCampusID} onChange={(e)=>{
                            setOpenCampusID(e.target.value);
                        }}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="walletAdd" className="text-lg font-medium">Open Campus Wallet Address</label>
                        <input type="text" name="walletAdd" id="walletAdd" className="border-2 border-gray-300 rounded-md p-2 w-full mt-1" value={walletAdd} onChange={(e)=>{
                            setWalletAdd(e.target.value);
                        }}/>
                    </div>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-[#252525] text-[#f1f3f5] rounded-full font-semibold text-xl">
                        Connect
                    </button>
                    </div>
                </div>
            </div>
    );
}

export default ConnectWithOCID;