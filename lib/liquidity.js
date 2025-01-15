// lib/liquidity.js
import { getSigner } from "@/lib/web3";
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "@/constants/address"; // Define your contract addresses
import { LiquidityPools } from "@/constants/abi/LiquidityPools"; // Import your ABI here

export const addLiquidity = async (tokenA, tokenB, amountA, amountB) => {
  try {
    const signer = await getSigner();
    const liquidityPool = new ethers.Contract(
      CONTRACT_ADDRESSES.LIQUIDITY_POOL, // The address of the LiquidityPool contract
      LiquidityPools, // The ABI for the liquidity pool contract
      signer
    );

    // Ensure that the user has approved the contract to transfer tokens
    const tokenAContract = new ethers.Contract(tokenA, ERC20_ABI, signer);
    const tokenBContract = new ethers.Contract(tokenB, ERC20_ABI, signer);

    // Approve liquidity pool contract to spend tokens
    await tokenAContract.approve(CONTRACT_ADDRESSES.LIQUIDITY_POOL, amountA);
    await tokenBContract.approve(CONTRACT_ADDRESSES.LIQUIDITY_POOL, amountB);

    // Add liquidity to the pool
    const tx = await liquidityPool.addLiquidity(tokenA, tokenB, amountA, amountB);
    await tx.wait(); // Wait for transaction to be mined

    console.log("Liquidity added successfully!");
  } catch (error) {
    console.error("Error adding liquidity:", error);
  }
};
