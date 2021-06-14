import { ethers } from "hardhat";
import { WBTC_ADDRESS_MAINNET } from "../test/helpers/constants";
import { SatsV1__factory } from "../typechain";

async function main() {
  const factory = (await ethers.getContractFactory("SatsV1")) as SatsV1__factory;

  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy(WBTC_ADDRESS_MAINNET, {
    gasPrice: 10000000000,
  });

  // The address the Contract WILL have once mined
  console.log(contract.address);

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash);

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
