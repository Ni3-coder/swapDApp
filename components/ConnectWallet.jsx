"use client"

import { useState, useEffect } from "react";

const getAccount = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } else {
    throw new Error("MetaMask is not installed");
  }
};

const ConnectWallet = () => {
  const [account, setAccount] = useState(null); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const storedAccount = localStorage.getItem("connectedAccount");
    if (storedAccount) {
      setAccount(storedAccount); 
    }
  }, []);

  const connectWallet = async () => {
    try {
      setLoading(true);
      const account = await getAccount(); 
      setAccount(account);
      localStorage.setItem("connectedAccount", account); 
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setLoading(false); 
    }
  };

  const disconnectWallet = () => {
    setAccount(null); 
    localStorage.removeItem("connectedAccount"); 
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
