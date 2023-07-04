import { deployments, ethers, config } from "hardhat";
import { Wallet as KlaytnWallet } from "@klaytn/ethers-ext";

async function main() {
  const Counter = await deployments.get("Counter");
  const counter = await ethers.getContractAt("Counter", Counter.address);
  console.log("Using contract at:", Counter.address);
  console.log("number before increment:", await counter.number());

  const provider = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const accounts = config.networks.baobab.accounts;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sender = new KlaytnWallet(accounts[0], provider);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const feePayer = new KlaytnWallet(accounts[1], provider);

  const fields = await counter.populateTransaction.increment();
  // {
  //   data: '0xd09de08a',
  //   to: '0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df',
  //   from: '0x3208ca99480F82bfE240cA6bc06110CD12Bb6366'
  // }

  const tx = {
    type: 0x31,
    to: fields.to,
    value: 0,
    from: fields.from,
    input: fields.data,
  };

  const populatedTx = await sender.populateTransaction(tx);
  console.log(populatedTx);

  // sender
  const senderTxHashRLP = await sender.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);

  // feePayer
  const decodedTx = feePayer.decodeTxFromRLP(senderTxHashRLP);
  decodedTx.feePayer = feePayer.getAddress();
  console.log(decodedTx);

  const sentTx = await feePayer.sendTransactionAsFeePayer(decodedTx);
  console.log("sentTx", sentTx);

  const rc = await sentTx.wait();
  console.log("receipt", rc);

  console.log("number after increment:", await counter.number());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
