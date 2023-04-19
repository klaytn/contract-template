import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@blukat29/hardhat-utils";
import "@primitivefi/hardhat-dodoc";
import * as dotenv from "dotenv";

// the first key of test-junk
const defaultKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    ],
  },
  networks: {
    baobab: {
      url: process.env.BAOBAB_URL || "https://archive-en.baobab.klaytn.net",
      chainId: 1001,
      accounts: [process.env.PRIVATE_KEY || defaultKey],
      live: true,
      saveDeployments: true,
    },
    cypress: {
      url: process.env.CYPRESS_URL || "https://archive-en.cypress.klaytn.net",
      chainId: 8217,
      accounts: [process.env.PRIVATE_KEY || defaultKey],
      live: true,
      saveDeployments: true,
    },
    homi: {
      url: "http://127.0.0.1:8551",
      accounts: [process.env.PRIVATE_KEY || defaultKey],
      live: false,
      saveDeployments: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY || defaultKey],
      live: false,
      saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  etherscan: { apiKey: "DUMMY" },
  dodoc: {
    exclude: ["hardhat/", "lib/"],
    runOnCompile: false,
    freshOutput: false,
  },
  paths: {
    deployments: "deployments",
  },
};

export default config;
