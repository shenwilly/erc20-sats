import { BigNumber } from "ethers";
import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    satsBalance: BigNumber.from(0),
    wbtcBalance: BigNumber.from(0),
    handleApprove: () => {},
    handleMint: () => {},
    handleBurn: () => {},
});

export default Context;
