import { deployments, ethers } from "hardhat";

async function main() {
  const Counter = await deployments.get("Counter");
  const counter = await ethers.getContractAt("Counter", Counter.address);
  console.log("Using contract at:", Counter.address);
  console.log("number before increment:", await counter.number());

  const tx = await counter.increment();
  await tx.wait();

  console.log("number after increment:", await counter.number());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
