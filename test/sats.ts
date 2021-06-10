import hre, { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { SatsV1__factory, SatsV1, ERC20 } from "../typechain";
import { WBTC_ADDRESS_MAINNET, WBTC_WHALE_ADDRESS } from "./helpers/constants";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Sats", () => {
  let sats: SatsV1;
  let user: SignerWithAddress;
  let wbtc: ERC20;
  let wbtcDecimals: number;
  let satsDecimals: number;

  before("Setup", async () => {
    const signers = await ethers.getSigners()
    user = signers[0]

    // setup contracts
    const SatsFactory = (
      await ethers.getContractFactory("SatsV1")
    ) as SatsV1__factory

    sats = await SatsFactory.deploy(WBTC_ADDRESS_MAINNET)
    satsDecimals = await sats.decimals()

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [WBTC_WHALE_ADDRESS],
    });
    const wbtcMinter = ethers.provider.getSigner(
      WBTC_WHALE_ADDRESS
    );
    
    // setup wbtc
    wbtc = (
      await ethers.getContractAt("ERC20", WBTC_ADDRESS_MAINNET)
    ) as ERC20;
    wbtcDecimals = await wbtc.decimals();
    const wbtcAmount = BigNumber.from("10").pow(wbtcDecimals).mul(2); // transfer 2 BTC
    await wbtc.connect(wbtcMinter).transfer(user.address, wbtcAmount);
    
    const wbtcToSatsAmount = wbtcAmount.div(2); // convert 1 BTC to SATS
    await wbtc.connect(user).approve(sats.address, wbtcToSatsAmount);
    const satsUser = sats.connect(user)
    await satsUser.wbtcToSats(user.address, wbtcToSatsAmount);
  });
  
  describe("Mint sats", async () => {
    it("should mint sats correctly", async () => {
      const wbtcBalanceUserBefore = await wbtc.balanceOf(user.address)
      const satsBalanceUserBefore = await sats.balanceOf(user.address)
      const wbtcBalanceContractBefore = await wbtc.balanceOf(sats.address)

      await wbtc.connect(user).approve(sats.address, wbtcBalanceUserBefore)

      const satsUser = sats.connect(user)
      await satsUser.wbtcToSats(user.address, wbtcBalanceUserBefore)

      const wbtcBalanceUserAfter = await wbtc.balanceOf(user.address)
      const satsBalanceUserAfter = await sats.balanceOf(user.address)
      const wbtcBalanceContractAfter = await wbtc.balanceOf(sats.address)

      const wbtcBalanceUserDifference = wbtcBalanceUserBefore.sub(wbtcBalanceUserAfter)
      const wbtcBalanceContractDifference = wbtcBalanceContractAfter.sub(wbtcBalanceContractBefore)
      expect(wbtcBalanceUserDifference.eq(wbtcBalanceContractDifference))

      const satsBalanceDifference = BigNumber.from("10").pow(satsDecimals).mul(wbtcBalanceUserDifference)
      expect(satsBalanceUserAfter.eq(satsBalanceUserBefore.add(satsBalanceDifference)))
    });
  });

  describe("burn sats", async () => {
    it("should burn sats correctly", async () => {
      const wbtcBalanceUserBefore = await wbtc.balanceOf(user.address)
      const satsBalanceUserBefore = await sats.balanceOf(user.address)
      const wbtcBalanceContractBefore = await wbtc.balanceOf(sats.address)

      const satsUser = sats.connect(user)
      await satsUser.satsToWbtc(user.address, satsBalanceUserBefore)

      const wbtcBalanceUserAfter = await wbtc.balanceOf(user.address)
      const satsBalanceUserAfter = await sats.balanceOf(user.address)
      const wbtcBalanceContractAfter = await wbtc.balanceOf(sats.address)

      const wbtcBalanceUserDifference = wbtcBalanceUserAfter.sub(wbtcBalanceUserBefore)
      const wbtcBalanceContractDifference = wbtcBalanceContractBefore.sub(wbtcBalanceContractAfter)
      expect(wbtcBalanceUserDifference.eq(wbtcBalanceContractDifference))

      const satsBalanceDifference = BigNumber.from("10").pow(satsDecimals).mul(wbtcBalanceUserDifference)
      expect(satsBalanceUserAfter.eq(satsBalanceUserBefore.add(satsBalanceDifference)))
    });
  });
});
