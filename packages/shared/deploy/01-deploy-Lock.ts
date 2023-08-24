import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { network } from "hardhat";

const deployLock: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();
  console.log(`Deployer is ${deployer}`);

  const lock: DeployResult = await deploy("Lock", {
    from: deployer,
    log: true,
    waitConfirmations: 1,
  });
  console.log(`Lock deployed to ${lock.address}`);
};

export default deployLock;
deployLock.tags = ["all", "lock"];
