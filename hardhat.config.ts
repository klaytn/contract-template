import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@klaytn/hardhat-utils";
import "@primitivefi/hardhat-dodoc";

// the first key of test-junk
const defaultKey = "0xb3cf575dea0081563fe5482de2fe4425e025502b1f4ae7e02b2540ac0a5beda1";
const defaultKey2 = "0x1768a169e38a01fcbaa29a07dbd2353448011421b5406931e80ea6a83c19b69c";
const defaultKey3 = "0xffafc26ddf1f5a1bc583ee2c6be5070ab47312708008029be0650271636380f4";

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
      accounts: [process.env.PRIVATE_KEY || defaultKey, defaultKey2, defaultKey3],
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
