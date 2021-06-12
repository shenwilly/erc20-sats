import { BigNumber, providers } from "ethers";
import React, { useCallback, useState, useEffect } from "react";
import { SATS_ADDRESS, SATS_DECIMALS, WBTC_ADDRESS, WBTC_DECIMALS } from "../../constants";
import useWeb3 from "../../hooks/useWeb3";
import { mint } from "../../utils/sats";
import { approve, getBalance } from "../../utils/web3";
import Context from "./Context";

const Provider: React.FC = ({ children }) => {
    const [satsBalance, setSatsBalance] = useState<BigNumber>();
    const [wbtcBalance, setWbtcBalance] = useState<BigNumber>();
    const { accountAddress, injectedProvider } = useWeb3();

    const fetchBalances = useCallback(
        async (userAddress: string, provider: providers.Provider) => {
        const balances = await Promise.all([
            await getBalance(userAddress, WBTC_ADDRESS, provider),
            await getBalance(userAddress, SATS_ADDRESS, provider),
        ]);
        setWbtcBalance(BigNumber.from(balances[0]).div(BigNumber.from(10).pow(WBTC_DECIMALS)));
        setSatsBalance(BigNumber.from(balances[1]).div(BigNumber.from(10).pow(SATS_DECIMALS)));
    }, [setSatsBalance, setWbtcBalance]);

    const handleApprove = useCallback(async (
        spenderAddress: string, 
        tokenAddress: string, 
        amount: string,
        onFinish: Function
    ) => {
        if (!injectedProvider) return;
        approve(
            spenderAddress, 
            tokenAddress, 
            amount, 
            injectedProvider, 
            injectedProvider.getSigner(0)
        ).then((tx) => {
            onFinish(tx);
        });
    }, [injectedProvider]);

    const handleMint = useCallback(async (
        userAddress: string,  
        amount: string,
        onFinish: Function
    ) => {
        if (!injectedProvider) return;
        mint(
            userAddress,  
            amount, 
            injectedProvider, 
            injectedProvider.getSigner(0)
        ).then((tx) => {
            onFinish(tx);
        });
    }, [injectedProvider]);
    
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
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;