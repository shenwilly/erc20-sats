import { BigNumber, ContractTransaction, ethers, providers, Signer } from "ethers";
import { SatsV1 } from "../types";
import Satsabi from "../contracts/abi/SatsV1.json"
import { SATS_ADDRESS } from "../constants";

export const getSats = (
    provider: providers.Provider
): SatsV1 => {
    return (new ethers.Contract(SATS_ADDRESS, Satsabi, provider)) as SatsV1;
};

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
  