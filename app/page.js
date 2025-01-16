"use client";
import { useState } from "react";
import ConnectWallet from "@/components/ConnectWallet";
import { addLiquidity } from "@/lib/liquidity";
import { swapTokens } from "@/lib/swap";
import { parseUnits } from "ethers";

const Home = () => {
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [tokenA, setTokenA] = useState("");  
  const [tokenB, setTokenB] = useState("");  
  const [loading, setLoading] = useState(false); 
  const [activeTab, setActiveTab] = useState("addLiquidity");

  const handleAddLiquidity = async () => {
    setLoading(true); 
    try {
      await addLiquidity(parseUnits(amountA, 18), parseUnits(amountB, 18));
      console.log(amountA);
    } catch (error) {
      console.error("Error adding liquidity", error);
    }
    setLoading(false);  
  };

  const handleSwap = async () => {
    setLoading(true);  
    try {
      await swapTokens(tokenA, parseUnits(amountA, 18));
    } catch (error) {
      console.error("Error swapping tokens", error);
    }
    setLoading(false); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Swap DApp</h1>
          <ConnectWallet />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex space-x-4 mb-6 border-b border-gray-300">
            <button
              className={`w-full py-2 text-lg font-semibold ${activeTab === "addLiquidity" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
              onClick={() => setActiveTab("addLiquidity")}
            >
              Add Liquidity
            </button>
            <button
              className={`w-full py-2 text-lg font-semibold ${activeTab === "swapTokens" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
              onClick={() => setActiveTab("swapTokens")}
            >
              Swap Tokens
            </button>
          </div>

          {activeTab === "addLiquidity" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center text-gray-800">Add Liquidity</h1>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Amount of TokenA"
                  onChange={(e) => setAmountA(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Amount of TokenB"
                  onChange={(e) => setAmountB(e.target.value)}
                />
                <button
                  className={`w-full p-3 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"} text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300`}
                  onClick={handleAddLiquidity}
                  disabled={loading}  // Disable button during loading
                >
                  {loading ? "Processing..." : "Add Liquidity"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "swapTokens" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center text-gray-800">Swap Tokens</h1>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Amount of TokenA to Swap"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                />
                <button
                  className={`w-full p-3 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"} text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  onClick={handleSwap}
                  disabled={loading}  // Disable button during loading
                >
                  {loading ? "Processing..." : "Swap Tokens"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Swap DApp. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Privacy Policy</a>
            <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
