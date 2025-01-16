# Swap DApp

A decentralized application (DApp) that allows users to add liquidity to a liquidity pool and swap tokens within the pool. This project integrates with Ethereum smart contracts using the ethers.js library and provides an intuitive frontend interface built with React.

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [Smart Contract Architecture](#smart-contract-architecture)
3. [Frontend Interaction](#frontend-interaction)
4. [Assumptions and Design Decisions](#assumptions-and-design-decisions)

---

## Project Setup

### Prerequisites
Before setting up the project, ensure that you have the following tools installed:

- **Node.js** (LTS version)
- **Yarn** or **npm**
- **Metamask** or any other Web3 wallet

### Clone the repository
```bash
git clone https://github.com/your-username/swap-dapp.git
cd swap-dapp

Install dependencies
npm install

Environment Configuration
Create a .env file in the root directory of the project and configure the following environment variables:
ALCHEMY_API_URL=""

Running the Project
npm start

Smart Contract Architecture
Overview
The core functionality of this DApp is based on Ethereum smart contracts that handle the logic for liquidity provision and token swapping. The smart contracts interact with ERC-20 token contracts (for TokenA and TokenB) and a LiquidityPool contract.

Contract Structure
TokenA and TokenB: These are ERC-20 token contracts, representing two different tokens that can be swapped and used for liquidity provision.

ERC-20 Standard Functions:
approve(): Allows the DApp to spend tokens on behalf of the user.
transfer(): Transfers tokens between users.
LiquidityPool: This contract is responsible for:

Accepting liquidity (TokenA and TokenB).
Allowing token swaps between TokenA and TokenB.
Calculating the exchange rate and handling the required logic for swaps.
Key Functions in LiquidityPool Contract
addLiquidity(amountA, amountB):

Adds liquidity to the pool by accepting specified amounts of TokenA and TokenB.
The user must approve the contract to spend tokens before calling this function.
swap(amountIn, tokenIn, tokenOut):

Swaps an input token (either TokenA or TokenB) for the output token.
Ensures the transaction's validity, calculates the exchange rate, and executes the swap.
Deployment
The smart contracts can be deployed to the Ethereum network (mainnet or testnet). Ensure that you deploy the contracts to a supported network and update the contract address in the frontend code accordingly.

Frontend Interaction
Overview
The frontend of the application allows users to:

Connect their wallet (e.g., MetaMask).
Add liquidity to the liquidity pool.
Swap tokens between TokenA and TokenB.
Pages and Components
Home Page:
The home page is split into two main sections:
Add Liquidity: Allows users to input amounts for TokenA and TokenB, then add liquidity to the pool.
Swap Tokens: Allows users to swap one token for another.
Connect Wallet: A component that allows users to connect their wallet using MetaMask. This is integrated with the getSigner() function that retrieves the wallet signer for interacting with Ethereum.
Interacting with Smart Contracts
addLiquidity():

Accepts two amounts (for TokenA and TokenB) and calls the addLiquidity function in the LiquidityPool smart contract.
Before adding liquidity, the user must approve the DApp to spend their tokens.
swapTokens():

Accepts an amount and the token type (either TokenA or TokenB) and calls the swap function in the LiquidityPool contract to swap tokens.
Handling Loading State
Both addLiquidity and swapTokens have loading states to prevent users from submitting the same transaction multiple times. Buttons are disabled, and the text changes to "Processing..." during the transaction.

React State Management
amountA: Amount of TokenA entered by the user.
amountB: Amount of TokenB entered by the user.
loading: Tracks the loading state when making transactions.
activeTab: Keeps track of the active tab between "Add Liquidity" and "Swap Tokens."
Web3 Integration
The application interacts with Ethereum through the ethers.js library. Users must have a Web3 wallet like MetaMask to connect to the blockchain.
Assumptions and Design Decisions
Assumptions
The DApp is designed to work with ERC-20 tokens (TokenA and TokenB). These tokens are already deployed on an Ethereum network.
Users must have an Ethereum wallet (MetaMask) to interact with the DApp.
The LiquidityPool contract is already deployed to the specified contract address.
Design Decisions
Transaction Handling:

Each transaction (adding liquidity or swapping tokens) is handled by awaiting the confirmation (tx.wait()) to ensure the transaction is successful before moving forward.
UI/UX:

Simple and intuitive user interface where users can easily toggle between adding liquidity and swapping tokens.
Loading state feedback is provided to the user to indicate that the system is processing their transaction.
Error Handling:

Errors in adding liquidity or swapping tokens are caught and logged to the console, providing transparency about any issues.
Gas Optimization:

Gas limits are provided for transactions to avoid running into issues where transactions fail due to insufficient gas.
License
This project is licensed under the MIT License - see the LICENSE file for details.

