import { deployments, ethers } from "hardhat";
import { setNumbers } from "../lib";

async function main() {
  const Counter = await deployments.get("Counter");
  const counter = await ethers.getContractAt("Counter", Counter.address);

  await setNumbers(counter, [10000000000000000000000000000000000000000n, 200n]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
