const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying Chronos Protocol with account:", deployer.address);

  const MockToken = await hre.ethers.getContractFactory("MockToken");
  const token = await MockToken.deploy();
  await token.waitForDeployment();
  console.log("Mock CRN Token deployed to:", await token.getAddress());

  const TimeLockVault = await hre.ethers.getContractFactory("TimeLockVault");
  const vault = await TimeLockVault.deploy(await token.getAddress());
  await vault.waitForDeployment();
  console.log("TimeLockVault deployed to:", await vault.getAddress());

  console.log("Deployment complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
