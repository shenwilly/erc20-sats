import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    account: undefined,
    accountAddress: "",
    web3Modal: undefined,
    injectedProvider: undefined,
    loadWeb3Modal: () => {},
    logoutOfWeb3Modal: () => {}
});

export default Context;
