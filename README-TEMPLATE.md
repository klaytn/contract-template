# example-contract

<_A one line description of the contracts_>

Example contract for demo

## What

<_A longer, one paragraph, description of the plugin_>

This is to demonstrate how example contracts can be used.
For details, refer to [getting started](./GETTING-STARTED.md).

## Installation

<_A step-by-step guide on how to install the plugin_>

```bash
npm install @klaytn/contract-template
```

Import the plugin in your `hardhat.config.js`:

```javascript
require("@klaytn/contract-template");
```

Or if you use TypeScript, import the plugin in your`hardhat.config.ts`:

```typescript
import "@klaytn/contract-template";
```

## Usage

<_How to use the contract repo from hardhat_>

### From hardhat project

<_How to use the contract repo from hardhat script and contract code_>

#### From script

In your `config` field in `hardhat.config.ts` or `hardhat.config.js`, add the following:

```json
{
  "external": {
    "deployments": {
      "baobab": ["@klaytn/contract-template/dist/export/baobab"],
      "cypress": ["@klaytn/contract-template/dist/export/cypress"]
    }
  }
}
```

```typescript
import { ethers } from "hardhat";
import { setNumbers } from "@klaytn/contract-template";

async function main() {
  const Counter = await deployments.get("Counter");
  const counter = await ethers.getContractAt(Counter.abi, Counter.address);

  console.log("number", await counter.number());
  await setNumbers(counter, [100000000000000000000000000000000000000n, 200n]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

#### From contract code

```sol
import "@klaytn/contract-template/contracts/Counter.sol";
```
