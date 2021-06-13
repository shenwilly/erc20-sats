import { BigNumber } from "ethers";

export interface ContextValues {
    satsBalance: BigNumber | undefined,
    wbtcBalance: BigNumber | undefined,
    handleApprove: (amount: string, onFinish: Function) => void,
    handleMint: (amount: string, onFinish: Function) => void,
    handleBurn: (amount: string, onFinish: Function) => void,
}
