require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();


const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key" 
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "0x"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      chainId: 5,
      url: GOERLI_RPC_URL,
      saveDeployments: true,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  solidity: {
    compilers: [
        {
            version: "0.8.17",
        },
        {
            version: "0.8.0",
        },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0, //here this will by default take the first account as deployer
    },
    player: {
      default: 1,
    },
  },
};
