import React, { useCallback, useState, useEffect } from "react";
import Context from "./Context";
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3modal";
import { Signer } from "ethers";

const Provider: React.FC = ({ children }) => {
    const [account, setAccount] = useState<Signer>();
    const [injectedProvider, setInjectedProvider] = useState<Web3Provider>();

    const loadWeb3Modal = useCallback(async () => {
        const provider = await web3Modal.connect();
        const web3Provider = new Web3Provider(provider)
        setInjectedProvider(web3Provider);
        setAccount(web3Provider.getSigner(0));
    }, [setInjectedProvider]);

    const logoutOfWeb3Modal = async () => {
        web3Modal.clearCachedProvider();
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
          loadWeb3Modal();
        }
    }, [loadWeb3Modal]);
    
    return (
        <Context.Provider
            value={{
                account,
                injectedProvider,
                web3Modal,
                loadWeb3Modal,
                logoutOfWeb3Modal
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;