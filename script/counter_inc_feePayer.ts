import { deployments, ethers, config, getChainId } from "hardhat";
import { Wallet as KlaytnWallet } from "@klaytn/ethers-ext";
import { normalizeHardhatNetworkAccountsConfig } from "hardhat/internal/core/providers/util";

async function getKlaytnSigners(): KlaytnWallet[] {
  // const accounts = normalizeHardhatNetworkAccountsConfig(config.networks.hardhat.accounts);
  let accounts;
  let url;
  for (const network in config.networks) {
    if (
      config.networks[network].chainId != undefined &&
      String(config.networks[network].chainId) == (await getChainId())
    ) {
      accounts = config.networks[network].accounts;
      url = config.networks[network].url;
    }
  }

  if (accounts == undefined || url == undefined) {
    throw new Error(`Check Hardhat networks config has url, chainId, and accounts info.`);
  }

  const privateKeys = normalizeHardhatNetworkAccountsConfig(accounts);
  // input:
  // [ "0xaaaa..", "0xbbbb.." ] OR
  // {
  //     mnemonic: "test test test test test test test test test test test junk",
  //     path: "m/44'/60'/0'/0",
  //     initialIndex: 0,
  //     count: 20,
  //     passphrase: "",
  // }

  const provider = new ethers.providers.JsonRpcProvider(url);

  const signers: KlaytnWallet[] = [];
  for (let i = 0; i < privateKeys.length; i++) {
    if (privateKeys[i]) {
      signers.push(await new KlaytnWallet(privateKeys[i], provider));
    }
  }
  return signers;
}

async function main() {
  const Counter = await deployments.get("Counter");
  const counter = await ethers.getContractAt("Counter", Counter.address);
  console.log("Using contract at:", Counter.address);
  console.log("number before increment:", await counter.number());

  const signers: KlaytnWallet[] = await getKlaytnSigners();

  const sender = signers[0];
  const feePayer = signers[1];

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
  decodedTx.feePayer = await feePayer.getAddress();
  const sentTx = await feePayer.sendTransactionAsFeePayer(decodedTx);
  await sentTx.wait();
  console.log("sending FeePayer transaction", "sender", sender.address, "feePayer", feePayer.address);

  console.log("number after increment:", await counter.number());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
