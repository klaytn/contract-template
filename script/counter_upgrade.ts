import { ethers, upgrades } from "hardhat";

const PROXY = "YOUR PROXY ADDRESS HERE";

async function main() {
  const CounterUpgradeableV2 = await ethers.getContractFactory("CounterUpgradeableV2");

  // It validates new implementation contract before upgrade it
  await upgrades.validateUpgrade(PROXY, CounterUpgradeableV2);

  // Upgrade implementation contract to CounterUpgradeableV2
  const upgradeTo = await upgrades.upgradeProxy(PROXY, CounterUpgradeableV2);

  console.log("V2 deployed to:", upgradeTo.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
