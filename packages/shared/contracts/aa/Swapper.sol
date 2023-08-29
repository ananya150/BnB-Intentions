// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BUSD.sol";

contract Swapper {
    address owner;
    BUSD busdToken;

    constructor(address busd) {
        owner = msg.sender;
        busdToken = BUSD(busd);
    }

    // both inputs with 18
    function swapBNBToBUSD(
        uint256 amountBNB,
        uint256 amountBUSD
    ) public payable {
        require(tx.origin == owner, "Swapper: Tx not initiated by owner");
        require(msg.value == amountBNB, "Invalid Transfer amount");
        busdToken.transferFrom(owner, msg.sender, amountBUSD);
    }

    function swapBUSDToBNB(
        uint256 amountBUSD,
        uint256 amountBNB
    ) public payable {
        require(tx.origin == owner, "Swapper: Tx not initiated by owner");
        busdToken.transferFrom(msg.sender, owner, amountBUSD);
        payable(msg.sender).transfer(amountBNB);
    }

    function transferBNB() public {
        require(msg.sender == owner, "Swapper: Sender not owner");
        payable(owner).transfer(address(this).balance);
    }

    function transferBUSD() public {
        require(msg.sender == owner, "Swapper: Sender not owner");
        uint256 bal = busdToken.balanceOf(address(this));
        busdToken.transfer(owner, bal);
    }

    receive() external payable {}
}
