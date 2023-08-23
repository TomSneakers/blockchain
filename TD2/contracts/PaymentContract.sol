// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;
    uint256 public balance;

    constructor() {
        owner = msg.sender;
    }

    function pay() external payable {
        require(msg.value > 0);
        balance += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(msg.sender == owner);
        require(amount <= balance);
        balance -= amount;
        payable(owner).transfer(amount);
    }
}
