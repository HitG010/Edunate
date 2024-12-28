// blockchain api functions for connecting smart contract to frontend
import { ethers } from "ethers";
import Edunate from "../artifacts/contracts/Edunate.sol/Edunate.json";

let userAccount = "";
let contractGlobal = null;
let Signer = null;

const getUserAccount = () => {
  return userAccount;
};
const getContract = () => {
  return contractGlobal;
};
// fetch eth address from metamask
const connectMetamask = async () => {
  if (window.ethereum) {
    console.log("Metamask installed!");
    const isBrowser = typeof window !== "undefined";
    const newProvider = isBrowser
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;
    console.log("This is newProvider", newProvider);
    // Request wallet connection and get account details
    await newProvider.send("eth_requestAccounts", []);
    const signer = newProvider.getSigner();
    const res = await (await signer).getAddress();
    // setAccount(res);
    userAccount = res;
    Signer = signer;
    console.log("Connected account:", res);

    // Load contract
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const newContract = new ethers.Contract(
      contractAddress,
      Edunate.abi,
      signer
    );
    contractGlobal = newContract;
    console.log("Contract:", newContract);

    return { account: res, contract: newContract };
  } else {
    console.error("Ethereum object not found, install MetaMask.");
    alert("MetaMask not installed! Please install MetaMask to continue.");
  }
};

// creating a fundraiser
const createFundraiser = async (
  contract,
  id,
  title,
  goal,
  milestoneDescs,
  milestoneAmts
) => {
  try {
    const tx = await contract.createFundraiser(
      id,
      title,
      goal,
      milestoneDescs,
      milestoneAmts
    );
    await tx.wait();
    console.log("Fundraiser created!");
    return { success: true, tx };
  } catch (err) {
    console.error(err);
  }
};

const fetchFundraiser = async (contract, id) => {
  try {
    const res = await contract.getFundraiser(id);
    console.log("Fundraiser fetched:", res);
    return res;
  } catch (err) {
    console.error(err);
  }
};

const donate = async () => {
//     if(!contractGlobal) {
//         console.error("Contract not loaded. Connect Metamask first.");
//         return;
//     }
//   try {
//     const tx = await contractGlobal.donate(id, { value: ethers.parseEther("0.1") });
//     console.log("This is tx", tx);
//     await tx.wait();
//     console.log("Donation successful!");
//     return { success: true, tx };
//   } catch (err) {
//     console.error("This is error",err);
//   }

    if(!contractGlobal) {
        console.error("Contract not loaded. Connect Metamask first.");
        return;
    }
    try{
        const tx = await contractGlobal.donate(contractGlobal.address, { value: ethers.utils.parseEther("0.01") });
        console.log("This is tx", tx);
        await tx.wait();
        console.log("Donation successful!");
        return { success: true, tx };
    }
    catch (err) {
        console.error("This is error",err);
    }
};

const sendMilestonePayment = async (addr) => {
    try {
        if (!Signer) {
            console.error("Signer not loaded. Connect Metamask first.");
            return;
        }
        const tx = await contractGlobal.sendMilestonePayment(addr, {value: ethers.utils.parseEther("0.001")});
        await tx.wait();
        console.log("Payment successful!");
        // fetchBalance();
      } catch (error) {
        console.error("Error sending payment:", error);
        // toast.error("Failed to send payment.");
      }
};

const makePayment = async () => {
    try {
        if (!Signer) {
            console.error("Signer not loaded. Connect Metamask first.");
            return;
        }
        const tx = await contractGlobal.pay({
          to: contractGlobal.address,
          value: ethers.parseEther("0.001"),
        });
        await tx.wait();
        console.log("Payment successful!");
        // fetchBalance();
      } catch (error) {
        console.error("Error sending payment:", error);
        // toast.error("Failed to send payment.");
      }
};

export { connectMetamask, createFundraiser, fetchFundraiser, donate, getUserAccount, getContract, makePayment, sendMilestonePayment };
