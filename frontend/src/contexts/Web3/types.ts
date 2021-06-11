import { providers, Signer } from "ethers";
import Web3Modal from "web3modal";

export interface ContextValues {
    account: Signer | undefined,
    injectedProvider: providers.Web3Provider | undefined,
    web3Modal?: Web3Modal,
    loadWeb3Modal: () => void,
    logoutOfWeb3Modal: () => void,
}
