# example-contract

PLEASE REPLACE %%your ~~%% ACCORDINGLY (also remove this statement)

This contract %%your description%%.

## Quickstart

### Prerequisites

From your hardhat project, run:

```bash
npm install %%your package%%
```

### Import abi, address from typescript/javascript

First, import this package in your `hardhat.config.js`:

```javascript
require("%%your package%%");
```

Or if you use TypeScript, import the plugin in your`hardhat.config.ts`:

```typescript
import "%%your package%%";
```

Also, in your `config` field in `hardhat.config.ts` or `hardhat.config.js`, add the following:

```json
{
  "external": {
    "deployments": {
      "baobab": ["%%your package%%/dist/export/baobab"],
      "cypress": ["%%your package%%/dist/export/cypress"]
    }
  }
}
```

Then, from your script:

```typescript
import { ethers } from "hardhat";
import { %%your function%% } from "%%your package%%";

async function main() {
    const Contract = await deployments.get("%%your contract%%");
    console.log(Contract.abi, Contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Import from solidity

```sol
import "%%your package%%/contracts/Counter.sol";
```
