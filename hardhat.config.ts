import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@klaytn/hardhat-utils";
import "@primitivefi/hardhat-dodoc";

// the first key of test-junk
const defaultKey = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const defaultKey2 = "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4";

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
      accounts: [process.env.PRIVATE_KEY || defaultKey, defaultKey2],
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
