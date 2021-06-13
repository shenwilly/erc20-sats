import { BigNumber } from "ethers";

export interface ContextValues {
    satsBalance: BigNumber,
    wbtcBalance: BigNumber,
    handleApprove: (amount: string, onFinish: Function) => void,
    handleMint: (amount: string, onFinish: Function) => void,
    handleBurn: (amount: string, onFinish: Function) => void,
}
