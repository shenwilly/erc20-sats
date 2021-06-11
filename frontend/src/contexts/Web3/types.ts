import { providers, Signer } from "ethers";
import Web3Modal from "web3modal";

export interface ContextValues {
    account: Signer | undefined,
    accountAddress: string,
    injectedProvider: providers.Web3Provider | undefined,
    web3Modal: Web3Modal | undefined,
    loadWeb3Modal: () => void,
    logoutOfWeb3Modal: () => void,
}
