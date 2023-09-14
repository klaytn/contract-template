// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CounterUpgradeableV2 {
    bool private _initialized;

    uint256 public number;
    // Added for V2
    uint256 public setTime;

    // You can also use Initializable.sol from openzeppelin
    // instead of implementing your own initializer
    modifier intializer() {
        require(!_initialized, "Contract instance has already been initialized");
        _;
        _initialized = true;
    }

    function initialize(uint256 _number) public intializer {
        number = _number;
    }

    function setNumber(uint256 newNumber) public {
        number = newNumber;
        setTime = block.timestamp;
    }

    function increment() public {
        number++;
        setTime = block.timestamp;
    }
}
