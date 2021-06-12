import { BigNumber } from "ethers";
import hre, { ethers } from "hardhat";
import { WBTC_ADDRESS_MAINNET, WBTC_WHALE_ADDRESS } from "../test/helpers/constants";
import { ERC20 } from "../typechain";

async function main() {
  let wbtc = await ethers.getContractAt("ERC20", WBTC_ADDRESS_MAINNET) as ERC20;

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [WBTC_WHALE_ADDRESS],
  });
  const wbtcMinter = ethers.provider.getSigner(
    WBTC_WHALE_ADDRESS
  );

  const tx = await wbtc.connect(wbtcMinter)
    .transfer("", BigNumber.from("10").pow(8).mul(2));
  console.log(tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
