import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    satsBalance: undefined,
    wbtcBalance: undefined,
    handleApprove: () => {},
});

export default Context;
