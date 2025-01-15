// lib/web3.js
import { ethers } from "ethers";

// Get the Web3 provider (MetaMask)
export const getProvider = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" }); // Request wallet connection
    return provider;
  } else {
    alert("Please install MetaMask to use this DApp.");
  }
};

// Get the signer from MetaMask (this represents the connected wallet)
export const getSigner = async () => {
  const provider = await getProvider();
  const signer = provider.getSigner();
  return signer;
};

// Get the user's account address from MetaMask
export const getAccount = async () => {
  const signer = await getSigner();
  const account = await signer.getAddress();
  return account;
};
