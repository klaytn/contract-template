// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "contracts/Counter.sol";

contract CounterScript is Script {
    Counter public c;

    function setUp() public {
        console.log("chainid:", block.chainid);
        console.log("msg.sender:", msg.sender);
        if (block.chainid == 31337) {
            // local network
            c = new Counter();
        } else {
            c = Counter(vm.envAddress("COUNTER"));
        }
        console.log("Using contract at", address(c));
    }

    function run() public {
        console.log("number before increment:", c.number());

        vm.broadcast();
        c.increment();

        console.log("number after increment:", c.number());
    }
}
