// lib/swap.js
import { getSigner } from "@/lib/web3";
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "@/constants/address";
import { LiquidityPools } from "@/constants/abi/LiquidityPools"; 

export const swapTokens = async (tokenIn, tokenOut, amountIn, amountOutMin) => {
  try {
    const signer = await getSigner();
    const liquidityPool = new ethers.Contract(
      CONTRACT_ADDRESSES.LIQUIDITY_POOL, 
      LiquidityPools, 
      signer
    );

    const tokenInContract = new ethers.Contract(tokenIn, ERC20_ABI, signer);

    await tokenInContract.approve(CONTRACT_ADDRESSES.LIQUIDITY_POOL, amountIn);

    const tx = await liquidityPool.swapTokens(tokenIn, tokenOut, amountIn, amountOutMin);
    await tx.wait(); 

    console.log("Tokens swapped successfully!");
  } catch (error) {
    console.error("Error swapping tokens:", error);
  }
};
