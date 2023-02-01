const { assert, expect } = require("chai");
const { network, getNamedAccounts, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("Raffle Unit Tests", function () {
      let raffle, raffleEntranceFee, deployer;

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        raffle = await ethers.getContract("Raffle", deployer);
        raffleEntranceFee = await raffle.getEnteranceFee();
      });

      describe("fulfillRandomWords", () => {
        it("worcks with Chainlink Keepers and Chainlink VRF, we get a ramdom winner", async () => {
                            // enter the raffle
          console.log("Setting up test...")
          const startingTimeStamp = await raffle.getLatestTimeStamp();
          const accounts = await ethers.getSigners();

          console.log("Setting up Listener...")
          await new Promise(async (resolve, reject) => {
            raffle.once("WinnerPicked", async () => {
              console.log("WinnerPicked enent fired!");


              try {
                const recentWinner = await raffle.getRecentWinner();
                const raffleState = await raffle.getRaffleState();
                const winnerEndingBalance = await accounts[0].getBalance();
                const endingTimeStamp = await raffle.getLatestTimeStamp();

                await expect(raffle.getPlayer(0)).to.be.reverted;
                assert.equal(recentWinner.toString(), accounts[0].address);
                assert.equal(raffleState, 0);
                assert.equal(
                  winnerEndingBalance.toString(),
                  winnerStartingBalance.add(raffleEntranceFee).toString())
                assert(endingTimeStamp > startingTimeStamp);
                resolve();

              } catch(error) {
                console.log(error)
                reject(error);
              }
            });
                      // Then entering the raffle
            console.log("Entering Raffle...")
            await raffle.enterRaffle({ value: raffleEntranceFee });
            console.log("Ok, time to wait...")
            const winnerStartingBalance = await accounts[0].getBalance();

          });



        });
      });
    });
