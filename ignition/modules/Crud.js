const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const CrudModule = buildModule("CrudModule", (m) => {
    // Define the contract deployment
    const crud = m.contract("Crud");

    // Return the deployed contract instance
    return { crud };
});

module.exports = CrudModule;
