# Contract-template

This template provides a template for contract development and operation, including tools and conventions.
These are recommended and not mendatory.
If you have a suggestion, please make a PR to the template.

This template ships the following tools:

- git hooks: husky
- linter
  - eslint (for `*.js`)
  - prettier (for `*.markdown`, `*.ts`)
  - solhint (for `*.sol`)
- solidity framework: foundry-rs, hardhat

## Prerequisites

```bash
npm install

# install foundry
curl -L https://foundry.paradigm.xyz | bash # https://getfoundry.sh/
```

## Git hooks

run linters if relevant files changed

## linter

`.prettier.json`

## Guide for development

### Compile

All contracts in `contracts/` directory are compiled.

```bash
forge build
# or
npx hardhat compile
```

### Unit test

Files in `test/` directory are run.

```bash
forge test
# or
npx hardhat test
```

### Coverage test

Coverage test is to figure out the coverage of the unit test.

```bash
forge coverage
# or
npx hardhat coverage
```

### Test on localhost network

There are two types of localhost network:

- ethereum node (anvil from foundry, hardhat-node from hardhat, or ganache from truffle)
- klaytn node (klaytn-deploy or homi).

These networks are defined in `foundry.toml` and `hardhat.config.ts`.

To spawn a localhost network with ethereum node:

```bash
anvil
# or
npx hardhat node
```

To spawn a localhost network with klaytn node: TBU

#### deploy

`hardhat-deploy` is a great tool for managing deployments. Note that it will use the output compiled with hardhat.

To run deploy scripts on the localhost network:

```bash
npx hardhat deploy --network localhost
```

It runs scripts in `deploy/` directory and saves the result on `deployments/` directory.

Try running the command again. It will reuse the contracts if previous deployments are found.

By default, this runs all scripts in `deploy/`. To run specific ones, we need to specify "tags" in the deploy script. For example, in case of `deploy/deploy_counter.ts`:

```
func.tags = ["Counter"];
```

Then run:

```bash
npx hardhat deploy --network localhost --tags Counter
```

[hardhat-utils](https://github.com/blukat29/hardhat-utils) plugin imports symbols from hardhat artifacts for `call` and `send` commands. Check the number variable with:

```bash
npx hardhat call Counter number --network localhost
```

#### script

Both foundry and hardhat provides scripting feature. Foundry supports [local/on-chain simulation modes](https://book.getfoundry.sh/tutorials/solidity-scripting#high-level-overview).
Note that `local` does not mean the localhost network by `anvil` or `npx hardhat node`, but a local EVM simulation.

To run the local simulation:

```bash
forge script script/Counter.s.sol
```

Now, let's run on-chain simulation on forked Baobab. Note that it will create a forked Baobab network locally and run transactions there. In other words, it will not send transactions to Baobab.

To run the on-chain simulation:

```bash
forge script script/Counter.s.sol --rpc-url baobab
```

If all succeeds, you are ready to deploy contracts and send transactions to Baobab.
See operation guide for deployment on Baobab.

#### library functions

Library contains reusable functions which are published on NPM reside in `lib/hardhat`.
It enables importing functions like below:

```js
// file: script/counter_setnums.ts
import { setNumbers } from "@klaytn/contract-template";
```

## Guide for operation

### Deployment

You need to create a network label for each deployment purpose.
For example, if we need one for QA on Baobab, append to networks in `hardhat.config.ts`:

```typescript
const config: HardhatUserConfig = {
  // ...
  networks: {
    baobab: {
      /* ... */
    },
    cypress: {
      /* ... */
    },
    "baobab-qa": {
      url: process.env.BAOBAB_URL || "https://archive-en.baobab.klaytn.net",
      accounts: [process.env.PRIVATE_KEY as string],
      live: false,
      saveDeployments: true,
    },
  },
  // ...
};
```

To deploy:

```bash
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
hh deploy --network baobab-qa --tags Counter
```

To send transactions:

```bash
export COUNTER=$(cat deployments/baobab-qa/Counter.json | jq -r .address)
forge script script/Counter.s.sol --rpc-url baobab-qa --private-key $PRIVATE_KEY --broadcast
# or
hh run script/counter.ts --network baobab-qa
```

### Verification

Upload the following file to scope / finder:

```bash
hh smart-flatten contracts/Counter.sol
cat artifacts/Counter.flat.sol | pbcopy
```

### Publish

It is recommended to publish hardhat tasks and forge scripts to NPM registry.

```bash
npm init
npm login
npm publish
```
