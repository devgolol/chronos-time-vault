const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Chronos TimeLockVault Protocol Test", function () {
  let deployer, alice;
  let token, vault;

  beforeEach(async function () {
    [deployer, alice] = await ethers.getSigners();

    const MockToken = await ethers.getContractFactory("MockToken");
    token = await MockToken.deploy();
    await token.waitForDeployment();

    const TimeLockVault = await ethers.getContractFactory("TimeLockVault");
    vault = await TimeLockVault.deploy(await token.getAddress());
    await vault.waitForDeployment();

    await token.mint(alice.address, ethers.parseEther("1000"));
    await token.connect(alice).approve(await vault.getAddress(), ethers.MaxUint256);
  });

  it("Should calculate accurate duration multipliers", async function () {
    expect(await vault.calculateMultiplier(86400 * 30)).to.equal(11000); // 1.1x
    expect(await vault.calculateMultiplier(86400 * 365)).to.equal(20000); // 2.0x
  });

  it("Should record stake positions with locked timestamp", async function () {
    const stakeAmount = ethers.parseEther("100");
    await vault.connect(alice).stake(stakeAmount, 86400 * 30);

    expect(await vault.totalStaked()).to.equal(stakeAmount);
    expect(await vault.getPositionCount(alice.address)).to.equal(1);
  });
});
