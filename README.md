# Contract-template

This template provides a template for contract development and operation, including tools and conventions.
If you have a suggestion, please make a PR to the template.

## Quickstart

### Prerequisites

```bash
npm install

# install foundry (https://getfoundry.sh/)
curl -L https://foundry.paradigm.xyz | bash
```

### Run

To Build & Test,

```bash
npx hardhat compile

npx hardhat test
forge test

npx hardhat coverage
forge coverage

# run scripts
forge script script/Counter.s.sol
forge script script/Counter.s.sol --rpc-url baobab
```

To deploy on local network, run `anvil` (or `npx hardhat node`) from another window and then continue.

```bash
# WARNING: this PRIVATE_KEY is well known! do not use for production!
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

npx hardhat deploy --network localhost --reset
npx hardhat call Counter number --network localhost # available via hardhat-utils plugin
npx hardhat run script/counter_inc.ts --network localhost
```

For detailed walkthrough, see [GETTING-STARTED](./GETTING-STARTED.md).

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

## After clone

There are a few things that MUST be done after a new repo has been created using this template.

- Update `package.json` by running `npm init`
- Things to remove
  - `deployments/`
- Writing docs from template
  - Overwrite `README.md` from [README-TEMPLATE.md](README-TEMPLATE.md)
  - Overwrite `GETTING-STARTED.md` from [GETTING-STARTED-TEMPLATE.md](GETTING-STARTED-TEMPLATE.md)
