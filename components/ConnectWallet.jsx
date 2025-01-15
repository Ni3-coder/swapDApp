"use client"

import { useState, useEffect } from "react";

// Function to get the account address
const getAccount = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0]; // Return the first account
  } else {
    throw new Error("MetaMask is not installed");
  }
};

const ConnectWallet = () => {
  const [account, setAccount] = useState(null); // State to store the connected account
  const [loading, setLoading] = useState(false); // Loading state for the button

  // On component mount, check if the account is stored in localStorage
  useEffect(() => {
    const storedAccount = localStorage.getItem("connectedAccount");
    if (storedAccount) {
      setAccount(storedAccount); // If the account exists in localStorage, set it
    }
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setLoading(true);
      const account = await getAccount(); // Get the account from MetaMask
      setAccount(account); // Set the connected account
      localStorage.setItem("connectedAccount", account); // Store the account in localStorage
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Disconnect function
  const disconnectWallet = () => {
    setAccount(null); // Reset the account state
    localStorage.removeItem("connectedAccount"); // Remove the account from localStorage
  };

  return (
    <div className="flex items-center space-x-4">
      {account ? (
        <>
          <p className="text-white">{account}</p>
          <button
            onClick={disconnectWallet}
            className="px-6 py-3 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`px-6 py-3 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? "Connecting..." : "Connect"}
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
