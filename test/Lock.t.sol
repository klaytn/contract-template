// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {Lock} from "contracts/Lock.sol";

contract LockTest is Test {
    Lock public lock;
    uint256 public unlockTime;
    uint256 public unlockAmount;

    event Withdrawal(uint256 amount, uint256 when);

    receive() external payable {}

    function setUp() public {
        unlockTime = block.timestamp + 365 days;
        unlockAmount = 1 gwei;
        lock = new Lock{value: unlockAmount}(unlockTime);
    }

    function testDeployment() public {
        assertEq(lock.unlockTime(), unlockTime);
        assertEq(lock.owner(), address(this));
        assertEq(address(lock).balance, unlockAmount);
    }

    function testWithdraw() public {
        uint256 x = address(this).balance;
        vm.warp(unlockTime);
        vm.expectEmit();
        emit Withdrawal(unlockAmount, block.timestamp);
        lock.withdraw();
        uint256 y = address(this).balance;
        assertEq(y - x, unlockAmount);
    }

    function testDeployWithPastUnlock() public {
        vm.expectRevert("Unlock time should be in the future");
        new Lock{value: unlockAmount}(block.timestamp);
    }

    function testWithdrawEarly() public {
        vm.expectRevert("You can't withdraw yet");
        lock.withdraw();
    }

    function testWithdrawNotOwner() public {
        vm.warp(unlockTime);
        vm.prank(address(lock));
        vm.expectRevert("You aren't the owner");
        lock.withdraw();
    }
}
