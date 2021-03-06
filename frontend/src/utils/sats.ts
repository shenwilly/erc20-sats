import { BigNumber, ContractTransaction, ethers, providers, Signer } from "ethers";
import { SatsV1 } from "../types";
import Satsabi from "../contracts/abi/SatsV1.json"
import { SATS_ADDRESS, WBTC_DECIMALS, BTC_TO_SATS_RATE, SATS_DECIMALS } from "../constants";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export const getSats = (
    provider: providers.Provider
): SatsV1 => {
    return (new ethers.Contract(SATS_ADDRESS, Satsabi, provider)) as SatsV1;
};

export const BTC_TO_SATS_RATE_BN = BigNumber.from(10).pow(BTC_TO_SATS_RATE);

export const mint = async (
    userAddress: string,
    amount: string,
    provider: providers.Provider,
    signer: Signer,
): Promise<ContractTransaction> => {
    const sats = getSats(provider);
    const tx = await sats.connect(signer).wbtcToSats(userAddress, BigNumber.from(amount))
    return tx;
};
  
export const burn = async (
    userAddress: string,
    amount: string,
    provider: providers.Provider,
    signer: Signer,
): Promise<ContractTransaction> => {
    const sats = getSats(provider);
    const tx = await sats.connect(signer).satsToWbtc(userAddress, BigNumber.from(amount))
    return tx;
};
  
export const btcStringToBN = (value: string): BigNumber => {
    let btcBN;
    try {
        if (value.length === 0) return BigNumber.from(0);
        btcBN = parseUnits(value, WBTC_DECIMALS);
    } catch (error) {
        console.log(error)
        btcBN = BigNumber.from(0)
    }
    return btcBN
}

export const satsStringToBN = (value: string): BigNumber => {
    let satsBN;
    try {
        if (value.length === 0) return BigNumber.from(0);
        satsBN = parseUnits(value, SATS_DECIMALS);
    } catch (error) {
        console.log(error)
        satsBN = BigNumber.from(0)
    }
    return satsBN
}
  
export const btcToSats = (value: string): string => {
    if (value.length === 0) return "";
    let btcValue = parseUnits(value, WBTC_DECIMALS);
    let satsValue = btcValue.mul(BTC_TO_SATS_RATE_BN).div(BigNumber.from(10).pow(WBTC_DECIMALS))
    return satsValue.toString();
}

export const satsToBtc = (value: string): string => {
    if (value.length === 0) return "";
    let satsValue = formatUnits(value, BTC_TO_SATS_RATE);
    return satsValue.toString();
}