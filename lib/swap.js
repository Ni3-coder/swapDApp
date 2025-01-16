import { getSigner } from "@/lib/web3";
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "@/constants/address";
import { LiquidityPools } from "@/constants/abi/LiquidityPools";
import { TokenA } from "@/constants/abi/TokenA";
import { TokenB } from "@/constants/abi/TokenB";

export const swapTokens = async (tokenA, amountIn) => {
  try {
    const signer = await getSigner();

    const tokenA = CONTRACT_ADDRESSES.TOKEN_A;
    const tokenB = CONTRACT_ADDRESSES.TOKEN_B;
    const LiquidityPool = CONTRACT_ADDRESSES.LIQUIDITY_POOL

    const tokenAContract = new ethers.Contract(tokenA, TokenA, signer);
    const tokenBContract = new ethers.Contract(tokenB, TokenB, signer);
    const liquiditypool = new ethers.Contract(LiquidityPool, LiquidityPools, signer)

    const approval = await tokenAContract.approve(liquiditypool, amountIn);
    await approval.wait();
    
    const aToB = tokenA === CONTRACT_ADDRESSES.TOKEN_A;

    const tx = await liquiditypool.swap(amountIn, aToB, {
      gasLimit: 1000000, 
    });
    await tx.wait();

    console.log("Tokens swapped successfully!");
  } catch (error) {
    console.error("Error swapping tokens:", error);
  }
};
