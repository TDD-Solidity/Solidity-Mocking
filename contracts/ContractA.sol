//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./ContractB.sol";

contract ContractA {
    
    ContractB internal contractB;

    constructor (ContractB _contractB) public {
        contractB = _contractB;
    }
    
    function start() public view returns (uint256) {
        
        
        return contractB.someCalculation() * 2;
    }

}
