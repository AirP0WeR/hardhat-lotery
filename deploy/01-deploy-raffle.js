const { network, ethers } = require("hardhat");
const { developmentChains} = require("../helper-hardhat-config");


module.exports = async function({getNamedAccounts, deployments}) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts;
    let vrfCoordinatorV2Address;

    if(developmentChains.includes(network.name)) {
        const VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
        VRFCoordinatorV2Mock = VRFCoordinatorV2Mock.address;
    }

    const args = [];
    const raffel = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
}