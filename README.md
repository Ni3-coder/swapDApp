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
```
## Smart Contract Architecture

### Overview

The core functionality of this DApp is based on Ethereum smart contracts that handle the logic for liquidity provision and token swapping. The smart contracts interact with ERC-20 token contracts (for TokenA and TokenB) and a LiquidityPool contract.

### Contract Structure

1. **TokenA and TokenB**: These are ERC-20 token contracts, representing two different tokens that can be swapped and used for liquidity provision.

   ERC-20 Standard Functions:
   - `approve()`: Allows the DApp to spend tokens on behalf of the user.
   - `transfer()`: Transfers tokens between users.

2. **LiquidityPool**: This contract is responsible for:
   - Accepting liquidity (TokenA and TokenB).
   - Allowing token swaps between TokenA and TokenB.
   - Calculating the exchange rate and handling the required logic for swaps.

### Key Functions in LiquidityPool Contract

1. `addLiquidity(amountA, amountB)`:
   - Adds liquidity to the pool by accepting specified amounts of TokenA and TokenB.
   - The user must approve the contract to spend tokens before calling this function.

2. `swap(amountIn, tokenIn, tokenOut)`:
   - Swaps an input token (either TokenA or TokenB) for the output token.
   - Ensures the transaction's validity, calculates the exchange rate, and executes the swap.

### Deployment

The smart contracts can be deployed to the Ethereum network (mainnet or testnet). For this project, we are using Sepolia Ethereum Test Network for development and testing purposes.

## Configuration

### 1. Deploying the Smart Contract on Sepolia Network

To deploy your smart contract on the Sepolia network, follow these steps:

#### Use Remix IDE

1. Visit [Remix IDE](https://remix.ethereum.org/).
2. Write or paste your smart contract code into the Remix editor.
3. In the "Deploy & Run Transactions" tab, choose Sepolia as the target network for deployment.
4. Connect your wallet (e.g., MetaMask) to the Sepolia network.
5. Deploy the contract using the Remix interface.

#### Copy the Contract Address

After successful deployment on the Sepolia network, copy the contract address from the Remix interface. You'll need this for the next step.

### 2. Updating the Contract Address in the Project

Once you have deployed your smart contract and obtained its address, you need to update it in your project:

1. In the project folder, navigate to the `addresses.js` file.
2. Open `addresses.js` and update the contract address

## Frontend Interaction

### Overview

The frontend of the application allows users to:

- Connect their wallet (e.g., MetaMask).
- Add liquidity to the liquidity pool.
- Swap tokens between TokenA and TokenB.

### Pages and Components

1. **Home Page**: The home page is split into two main sections:
   - Add Liquidity: Allows users to input amounts for TokenA and TokenB, then add liquidity to the pool.
   - Swap Tokens: Allows users to swap one token for another.

2. **Connect Wallet**: A component that allows users to connect their wallet using MetaMask. This is integrated with the `getSigner()` function that retrieves the wallet signer for interacting with Ethereum.

### Interacting with Smart Contracts

1. `addLiquidity()`:
   - Accepts two amounts (for TokenA and TokenB) and calls the `addLiquidity` function in the LiquidityPool smart contract.
   - Before adding liquidity, the user must approve the DApp to spend their tokens.

2. `swapTokens()`:
   - Accepts an amount and the token type (either TokenA or TokenB) and calls the `swap` function in the LiquidityPool contract to swap tokens.

### Handling Loading State

Both `addLiquidity` and `swapTokens` have loading states to prevent users from submitting the same transaction multiple times. Buttons are disabled, and the text changes to "Processing..." during the transaction.

### React State Management

- `amountA`: Amount of TokenA entered by the user.
- `amountB`: Amount of TokenB entered by the user.
- `loading`: Tracks the loading state when making transactions.
- `activeTab`: Keeps track of the active tab between "Add Liquidity" and "Swap Tokens."

### Web3 Integration

The application interacts with Ethereum through the ethers.js library. Users must have a Web3 wallet like MetaMask to connect to the blockchain.

## Assumptions and Design Decisions

### Assumptions

1. The DApp is designed to work with ERC-20 tokens (TokenA and TokenB). These tokens are already deployed on an Ethereum network.
2. Users must have an Ethereum wallet (MetaMask) to interact with the DApp.
3. The LiquidityPool contract is already deployed to the specified contract address.

### Design Decisions

1. **Transaction Handling**:
   - Each transaction (adding liquidity or swapping tokens) is handled by awaiting the confirmation (`tx.wait()`) to ensure the transaction is successful before moving forward.

2. **UI/UX**:
   - Simple and intuitive user interface where users can easily toggle between adding liquidity and swapping tokens.
   - Loading state feedback is provided to the user to indicate that the system is processing their transaction.

3. **Error Handling**:
   - Errors in adding liquidity or swapping tokens are caught and logged to the console, providing transparency about any issues.

4. **Gas Optimization**:
   - Gas limits are provided for transactions to avoid running into issues where transactions fail due to insufficient gas.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



