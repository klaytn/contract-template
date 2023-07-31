import { deployments, ethers } from "hardhat";
import { Wallet as KlaytnWallet } from "@klaytn/ethers-ext";
import "@klaytn/hardhat-utils";

async function main() {
  const Counter = await deployments.get("Counter");
  const counter = await ethers.getContractAt("Counter", Counter.address);
  console.log("Using contract at:", Counter.address);
  console.log("number before increment:", await counter.number());

  const provider = new ethers.providers.JsonRpcProvider(hre.network.config.url);
  const accounts = await hre.ethers.getWallets();

  const sender = new KlaytnWallet(accounts[0].privateKey, provider);
  const feePayer = new KlaytnWallet(accounts[1].privateKey, provider);

  const fields = await counter.populateTransaction.increment();
  // {
  //   data: '0xd09de08a',
  //   to: '0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df',
  // }

  const tx = {
    type: 0x31,
    to: fields.to,
    value: 0,
    from: await sender.getAddress(),
    input: fields.data,
    gasLimit: 40100,
  };

  const populatedTx = await sender.populateTransaction(tx);
  console.log(populatedTx);

  // sender
  const senderTxHashRLP = await sender.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);

  // feePayer
  const decodedTx = feePayer.decodeTxFromRLP(senderTxHashRLP);
  console.log(decodedTx);
  decodedTx.feePayer = feePayer.address;

  const sentTx = await feePayer.sendTransactionAsFeePayer(decodedTx);
  const rc = await sentTx.wait();
  console.log("receipt", rc);

  console.log("Fee delegated transaction", "sender", sender.address, "feePayer", feePayer.address);

  console.log("number after increment:", await counter.number());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
