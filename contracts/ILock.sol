// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ILock {
    event Withdrawal(uint256 amount, uint256 when);

    function withdraw() external;
}
