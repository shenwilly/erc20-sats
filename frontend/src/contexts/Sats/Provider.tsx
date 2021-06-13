import { BigNumber, providers } from "ethers";
import React, { useCallback, useState, useEffect } from "react";
import { SATS_ADDRESS, WBTC_ADDRESS } from "../../constants";
import useWeb3 from "../../hooks/useWeb3";
import { mint, burn } from "../../utils/sats";
import { approve, getBalance } from "../../utils/web3";
import Context from "./Context";

const Provider: React.FC = ({ children }) => {
    const [satsBalance, setSatsBalance] = useState<BigNumber>(BigNumber.from(0));
    const [wbtcBalance, setWbtcBalance] = useState<BigNumber>(BigNumber.from(0));
    const { accountAddress, injectedProvider } = useWeb3();

    const fetchBalances = useCallback(
        async (userAddress: string, provider: providers.Provider) => {
        const balances = await Promise.all([
            await getBalance(userAddress, WBTC_ADDRESS, provider),
            await getBalance(userAddress, SATS_ADDRESS, provider),
        ]);
        setWbtcBalance(BigNumber.from(balances[0]));
        setSatsBalance(BigNumber.from(balances[1]));
    }, [setSatsBalance, setWbtcBalance]);

    const handleApprove = useCallback(async (
        amount: string,
        onFinish: Function
    ) => {
        if (!injectedProvider || !accountAddress) return;
        approve(
            SATS_ADDRESS, 
            WBTC_ADDRESS, 
            amount, 
            injectedProvider, 
            injectedProvider.getSigner(0)
        ).then((tx) => {
            onFinish(tx);
        });
    }, [injectedProvider, accountAddress]);

    const handleMint = useCallback(async (
        amount: string,
        onFinish: Function
    ) => {
        if (!injectedProvider || !accountAddress) return;
        mint(
            accountAddress,  
            amount, 
            injectedProvider, 
            injectedProvider.getSigner(0)
        ).then((tx) => {
            onFinish(tx);
        });
    }, [injectedProvider, accountAddress]);

    const handleBurn = useCallback(async (
        amount: string,
        onFinish: Function
    ) => {
        if (!injectedProvider || !accountAddress) return;
        burn(
            accountAddress,  
            amount, 
            injectedProvider, 
            injectedProvider.getSigner(0)
        ).then((tx) => {
            onFinish(tx);
        });
    }, [injectedProvider, accountAddress]);
    
    useEffect(() => {
        if (accountAddress && injectedProvider) {
            fetchBalances(accountAddress, injectedProvider);
            let refreshInterval = setInterval(() => fetchBalances(accountAddress, injectedProvider), 10000);
            return () => clearInterval(refreshInterval);
        }
    }, [accountAddress, injectedProvider, fetchBalances]);

    return (
        <Context.Provider
            value={{
                satsBalance,
                wbtcBalance,
                handleApprove,
                handleMint,
                handleBurn
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;