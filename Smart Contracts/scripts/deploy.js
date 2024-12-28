const hre = require("hardhat");

async function main() {
  
  const upload = await hre.ethers.deployContract("Edunate");
  await upload.waitForDeployment();

  console.log("Library deployed to:", upload.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x5948C77B37139f34b86EaE6b84c570c937dC03c0