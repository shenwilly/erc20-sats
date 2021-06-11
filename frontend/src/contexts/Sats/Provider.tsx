import { BigNumber, providers } from "ethers";
import React, { useCallback, useState, useEffect } from "react";
import { SATS_ADDRESS, SATS_DECIMALS, WBTC_ADDRESS, WBTC_DECIMALS } from "../../constants";
import useWeb3 from "../../hooks/useWeb3";
import { getBalance } from "../../utils/web3";
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
        setSatsBalance(BigNumber.from(balances[0]).div(BigNumber.from(10).pow(SATS_DECIMALS)));
        setWbtcBalance(BigNumber.from(balances[1]).div(BigNumber.from(10).pow(WBTC_DECIMALS)));
    }, [setSatsBalance, setWbtcBalance]);
    
    useEffect(() => {
        if (accountAddress && injectedProvider) {
            fetchBalances("0xccf4429db6322d5c611ee964527d42e5d685dd6a", injectedProvider);
            let refreshInterval = setInterval(() => fetchBalances("0xccf4429db6322d5c611ee964527d42e5d685dd6a", injectedProvider), 10000);
            // let refreshInterval = setInterval(() => fetchBalances(accountAddress, injectedProvider), 10000);
            return () => clearInterval(refreshInterval);
        }
    }, [accountAddress, injectedProvider, fetchBalances]);

    return (
        <Context.Provider
            value={{
                satsBalance,
                wbtcBalance,
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;