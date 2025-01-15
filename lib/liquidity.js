import { ethers } from "ethers";
import { getSigner } from "@/lib/web3"; 
import { CONTRACT_ADDRESSES } from "@/constants/address"; 
import { LiquidityPools } from "@/constants/abi/LiquidityPools"; 
import { TokenA } from "@/constants/abi/TokenA";
import { TokenB } from "@/constants/abi/TokenB";

export const addLiquidity = async (amountA, amountB) => {
  try {
    const signer = await getSigner();

    const tokenA = CONTRACT_ADDRESSES.TOKEN_A;
    const tokenB = CONTRACT_ADDRESSES.TOKEN_B;
    const LiquidityPool = CONTRACT_ADDRESSES.LIQUIDITY_POOL

    const tokenAContract = new ethers.Contract(tokenA, TokenA, signer);
    const tokenBContract = new ethers.Contract(tokenB, TokenB, signer);
    const liquiditypool = new ethers.Contract(LiquidityPool, LiquidityPools, signer)

    const approvalATx = await tokenAContract.approve(CONTRACT_ADDRESSES.LIQUIDITY_POOL, amountA);
    await approvalATx.wait();

    const approvalBTx = await tokenBContract.approve(CONTRACT_ADDRESSES.LIQUIDITY_POOL, amountB);
    await approvalBTx.wait();

    const tx = await liquiditypool.addLiquidity(amountA, amountB, {
      gasLimit: 500000, 
    });
    await tx.wait();
    console.log("Liquidity added successfully!");

    return tx.hash;
  } catch (error) {
    console.error("Error adding liquidity:", error);
    throw error;
  }
};
