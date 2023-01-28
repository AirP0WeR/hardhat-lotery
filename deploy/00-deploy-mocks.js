const { ethers } = require("ethers");
const { network } = require("hardhat");
const { networkConfig, developmentChains} = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LINK = 1e9;

modules.export = async function({getNamedAccounts, deployments}) {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts;
    const args = [BASE_FEE, GAS_PRICE_LINK]
    
    if(developmentChains.includes(network.name)) {
        log("local network detected. Deploying mocks...");
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mock deployed successfully");
        log("--------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]