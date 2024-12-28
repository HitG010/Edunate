// blockchain api functions for connecting smart contract to frontend
import { ethers } from "ethers";
import Edunate from "../artifacts/contracts/Edunate.sol/Edunate.json";

let userAccount = "";
let contractGlobal = null;

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
      ? new ethers.BrowserProvider(window.ethereum)
      : null;
    console.log("This is newProvider", newProvider);
    // Request wallet connection and get account details
    await newProvider.send("eth_requestAccounts", []);
    const signer = newProvider.getSigner();
    const res = await (await signer).getAddress();
    // setAccount(res);
    userAccount = res;
    console.log("Connected account:", res);

    // Load contract
    const contractAddress = "0x5948C77B37139f34b86EaE6b84c570c937dC03c0";
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
  description,
  goal,
  milestoneDescs,
  milestoneAmts
) => {
  try {
    const tx = await contract.createFundraiser(
      id,
      title,
      description,
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

const donate = async (id) => {
    if(!contractGlobal) {
        console.error("Contract not loaded. Connect Metamask first.");
        return;
    }
  try {
    const tx = await contractGlobal.donate(id, { value: ethers.parseEther("0.1") });
    console.log("This is tx", tx);
    await tx.wait();
    console.log("Donation successful!");
    return { success: true, tx };
  } catch (err) {
    console.error("This is error",err);
  }
};

export { connectMetamask, createFundraiser, fetchFundraiser, donate, getUserAccount, getContract };
