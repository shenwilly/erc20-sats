import { providers } from "ethers";
import Web3Modal from "web3modal";

export interface ContextValues {
    injectedProvider: providers.Web3Provider | undefined,
    web3Modal?: Web3Modal,
    loadWeb3Modal: () => void,
    logoutOfWeb3Modal: () => void,
}
