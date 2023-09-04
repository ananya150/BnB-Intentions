import { ethers } from "ethers";
import AccountFactory from "../artifacts/contracts/aa/AccountFactory.sol/AccountFactory.json";
import Swapper from "../artifacts/contracts/aa/Swapper.sol/Swapper.json";
import BUSD from "../artifacts/contracts/aa/BUSD.sol/BUSD.json";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  // get deployer

  const OPBNB_PROVIDER = "https://opbnb-testnet-rpc.bnbchain.org/";
  const BNB_PROVIDER = "https://bsc-testnet.publicnode.com/";

  const opBnbProvider = new ethers.providers.JsonRpcProvider(OPBNB_PROVIDER);
  const bnbProvider = new ethers.providers.JsonRpcProvider(BNB_PROVIDER);
  const opBnbDeployer = new ethers.Wallet(
    `${process.env.DEPLOYER_PRIVATE_KEY}`,
    opBnbProvider,
  );
  const bnbDeployer = new ethers.Wallet(
    `${process.env.DEPLOYER_PRIVATE_KEY}`,
    bnbProvider,
  );
  console.log(`Deployer is ${opBnbDeployer.address}`);

  // deploy factory
  const opBnbAccountFactoryFactory = new ethers.ContractFactory(
    AccountFactory.abi,
    AccountFactory.bytecode,
    opBnbDeployer,
  );
  const bnbAccountFactoryFactory = new ethers.ContractFactory(
    AccountFactory.abi,
    AccountFactory.bytecode,
    bnbDeployer,
  );
  const opBnbAccountFactory = await opBnbAccountFactoryFactory.deploy();
  const bnbAccountFactory = await bnbAccountFactoryFactory.deploy();
  console.log(`ACCOUNT_FACTORY_ADDRESS: ${bnbAccountFactory.address}`);

  // deploy busd
  const opBnbBUSDFactory = new ethers.ContractFactory(
    BUSD.abi,
    BUSD.bytecode,
    opBnbDeployer,
  );
  const bnbBUSDFactory = new ethers.ContractFactory(
    BUSD.abi,
    BUSD.bytecode,
    bnbDeployer,
  );
  const opBnbBUSD = await opBnbBUSDFactory.deploy();
  const bnbBUSD = await bnbBUSDFactory.deploy();
  console.log(`BUSD_ADDRESS: ${bnbBUSD.address}`);

  // deploy swapper
  const opBnbSwapperFactory = new ethers.ContractFactory(
    Swapper.abi,
    Swapper.bytecode,
    opBnbDeployer,
  );
  const bnbSwapperFactory = new ethers.ContractFactory(
    Swapper.abi,
    Swapper.bytecode,
    bnbDeployer,
  );
  const opBnbSwapper = await opBnbSwapperFactory.deploy(opBnbBUSD.address);
  const bnbSwapper = await bnbSwapperFactory.deploy(opBnbBUSD.address);
  console.log(`SWAPPER_ADDRESS: ${bnbSwapper.address}`);

  // allowance to swapper

  const opBnbusdContract = new ethers.Contract(
    opBnbBUSD.address,
    BUSD.abi,
    opBnbDeployer,
  );
  await opBnbusdContract.approve(
    opBnbSwapper.address,
    ethers.utils.parseUnits("1000000.0", 18),
  );
  const bnbusdContract = new ethers.Contract(
    bnbBUSD.address,
    BUSD.abi,
    bnbDeployer,
  );
  await bnbusdContract.approve(
    bnbSwapper.address,
    ethers.utils.parseUnits("1000000.0", 18),
  );
  console.log("Allowance added");

  // send BNB to swapper
  const tx = {
    to: opBnbSwapper.address,
    value: ethers.utils.parseEther("0.5"),
  };
  await opBnbDeployer.sendTransaction(tx);
  await bnbDeployer.sendTransaction(tx);
  console.log("BNB sent");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
