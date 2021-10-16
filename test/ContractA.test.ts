import { expect } from "chai";
const { ContractFactory, utils } = require('ethers');

const { MockProvider } = require('@ethereum-waffle/provider');
const { deployMockContract } = require('@ethereum-waffle/mock-contract');

import ContractAJson from '../artifacts/contracts/ContractA.sol/ContractA.json';
import ContractBJson from '../artifacts/contracts/ContractB.sol/ContractB.json';
import { ContractA, ContractB } from "../typechain";

describe("ContractA", function () {

    let MockContractB: any
    let mockContractB: ContractB
    let contractA: ContractA

    const mockCalculationResult = 5;

    beforeEach(async () => {
        const [sender] = new MockProvider().getWallets();

        // deploy MOCK contractB
        MockContractB = await deployMockContract(sender, ContractBJson.abi);
        mockContractB = await MockContractB.deployed();

        // deploy REAL contractA
        const contractFactory = new ContractFactory(ContractAJson.abi, ContractAJson.bytecode, sender);
        contractA = await contractFactory.deploy(MockContractB.address);

        // mock B's "somCalculation" function
        await MockContractB.mock.someCalculation.returns(mockCalculationResult)
    })

    it("returns twice the calculation result from contractB", async function () {

        const actual = await contractA.start();

        // expect that call to contractB's someCalculation function
        // used our mock value ( 5 ) rather than the real value ( 1000 ).
        expect(actual).to.equal(mockCalculationResult * 2);

        // expect that contractB's someCalculation was called
        expect('someCalculation').to.be.calledOnContract(42);

    });

});
