import { ethers } from "ethers";

async function setNumbers(counter: ethers.Contract, numList?: bigint[]) {
  if (numList === undefined) {
    return;
  }
  for (const num of numList) {
    console.log("========================");
    console.log(`#${num}`);
    console.log("Setting number:", num);
    let tx = await counter.setNumber(num);
    await tx.wait();
    console.log("number set:", await counter.number());
  }
}

async function multInc(counter: ethers.Contract, cnt: number) {
  for (let i = 0; i < cnt; i++) {
    console.log("========================");
    console.log(`#${i}`);
    let tx = await counter.increment();
    await tx.wait();
    console.log("number increased:", await counter.number());
  }
}

export { setNumbers, multInc };
