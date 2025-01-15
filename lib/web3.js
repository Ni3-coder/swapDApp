import { ethers } from "ethers";

export const getProvider = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" }); 
    return provider;
  } else {
    alert("Please install MetaMask to use this DApp.");
  }
};

export const getSigner = async () => {
  const provider = await getProvider();
  const signer = provider.getSigner();
  return signer;
};

export const getAccount = async () => {
  const signer = await getSigner();
  const account = await signer.getAddress();
  return account;
};
