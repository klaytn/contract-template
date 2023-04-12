# Contract-template

This template provides a template for contract development and operation, including tools and conventions.
These are recommended and not mandatory.
If you have a suggestion, please make a PR to the template.

## Overview

### Directory Structure

The directory structure of this template is as follows:

- `contracts/`: solidity contracts
- `deploy/`: deployment scripts
- `deployments/`: hardhat-deploy files
- `lib/`: library functions to be published to NPM
- `script/`: scripts to interact with contracts
- `test/`: unit tests
- `GETTING-STARTED.md`: developer guide in detail for those willing to contribute (internally and externally)
- `README-TEMPLATE.md`: user guide
- `hardhat.config.ts`: hardhat configuration
- `foundry.toml`: foundry configuration

## Must-do After Repo Creation

There are a few things that MUST be done after a new repo has been created using this template.

- Update `package.json` by running `npm init`
- Things to remove
  - `deployments/`
  - `README.md`
- Writing docs
  - Copy and write `README.md` from [README-TEMPLATE.md](README-TEMPLATE.md)
  - Fill in [GETTING-STARTED.md](GETTING-STARTED.md) for developer guide
