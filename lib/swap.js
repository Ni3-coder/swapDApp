// lib/swap.js
import { getSigner } from "@/lib/web3";
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "@/constants/address"; // Define your contract addresses
import { LiquidityPools } from "@/constants/abi/LiquidityPools"; // Import your ABI here

export const swapTokens = async (tokenIn, tokenOut, amountIn, amountOutMin) => {
  try {
    const signer = await getSigner();
    const liquidityPool = new ethers.Contract(
      CONTRACT_ADDRESSES.LIQUIDITY_POOL, // The address of the LiquidityPool contract
      LiquidityPool, // The ABI for the liquidity pool contract
      signer
    );

    // Ensure that the user has approved the contract to transfer tokens
    const tokenInContract = new ethers.Contract(tokenIn, ERC20_ABI, signer);

    await tokenInContract.approve(CONTRACT_ADDRESSES.LIQUIDITY_POOL, amountIn);

    // Perform token swap
    const tx = await liquidityPool.swapTokens(tokenIn, tokenOut, amountIn, amountOutMin);
    await tx.wait(); // Wait for transaction to be mined

    console.log("Tokens swapped successfully!");
  } catch (error) {
    console.error("Error swapping tokens:", error);
  }
};
