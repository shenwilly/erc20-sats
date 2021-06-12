import { BigNumber } from "ethers";

export interface ContextValues {
    satsBalance: BigNumber | undefined,
    wbtcBalance: BigNumber | undefined,
    handleApprove: (spenderAddress: string, tokenAddress: string, amount: string, onFinish: Function) => void,
    handleMint: (userAddress: string, amount: string, onFinish: Function) => void,
}
