# Contract-template

This template provides a template for contract development and operation, including tools and conventions.
If you have a suggestion, please make a PR to the template.

## After clone

There are a few things that MUST be done after a new repo has been created using this template.

- Update `package.json` by running `npm init`
- Things to remove
  - `deployments/`
  - `lib/hardhat/index.ts`
- Writing docs from template
  - Overwrite `README.md` from [README-TEMPLATE.md](README-TEMPLATE.md)
  - Overwrite `GETTING-STARTED.md` from [GETTING-STARTED-TEMPLATE.md](GETTING-STARTED-TEMPLATE.md)

## Quickstart

See [GETTING-STARTED](GETTING-STARTED.md) for details.

### Prerequisites

From your hardhat project, run:

```bash
npm install @klaytn/contract-template
```

### Import abi, address from typescript/javascript

```typescript
import { Counter } from "@klaytn/contract-template";

async function main() {
  console.log(Counter.address, Counter.abi.substring(0, 16));
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
import "@klaytn/contract-template/contracts/Counter.sol";
```

## What's Included?

Tools

- [hardhat](https://hardhat.org/): Contract dev tool
- [foundry](https://github.com/foundry-rs/foundry): Contract dev tool
- [hardhat-utils](https://github.com/klaytn/hardhat-utils): Hardhat plugin
- [eslint](https://eslint.org/): typescript linter
- [solhint](https://github.com/protofire/solhint): solidity linter
- [prettier](https://prettier.io/): markdown, typescript formatter
- [husky](https://github.com/typicode/husky): git hook tool
- Github actions

Files

- Sample contracts in `contracts/`
- Sample [hardhat-deploy](https://github.com/wighawag/hardhat-deploy) scripts in `deploy/`
- Sample library functions in `lib/`
- Sample scripts in `script/`
- Sample tests in `test/`
- Document templates (`README-TEMPLATE.md`, `GETTING-STARTED-TEMPLATE.md`)
- Sample configurations (`hardhat.config.ts`, `foundry.toml`)
