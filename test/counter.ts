import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  async function deployCounterFixture() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter };
  }

  describe("Deployment", function () {
    it("counter", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      expect(await counter.number()).to.equal(0);
      await counter.increment();
      expect(await counter.number()).to.equal(1);
    });
  });
});
