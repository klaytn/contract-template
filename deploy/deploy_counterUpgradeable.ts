import { ethers, upgrades } from "hardhat";

/**
 * @dev Notes that upgradeable deployment script doesn't generate contract.json file in deployment folder.
 * You should manage the address of the upgradeable contract for future use.
 */
async function main() {
  const CounterUpgradeable = await ethers.getContractFactory("CounterUpgradeable");
  const counterUpgradeable = await upgrades.deployProxy(CounterUpgradeable, [0], {
    initializer: "initialize",
  });
  await counterUpgradeable.deployed();

  console.log("CounterUpgradeable deployed to:", counterUpgradeable.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
