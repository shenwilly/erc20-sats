import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { Button, Box, Flex, Text } from "@chakra-ui/react"

const Account = ({ web3Modal, loadWeb3Modal, logoutOfWeb3Modal, injectedProvider }) => {
    const [ address, setAddress ] = useState("");
    const [ balance, setBalance ] = useState("-");

    const getBalance = async (provider) => {
        let balance = await provider.getBalance(address);
        setBalance(truncateBalance(formatEther(balance), 4));
    }

    useEffect(() => {
        const fetchAddress = async (provider) => {
          const signer = provider.getSigner(0);
          setAddress(await signer.getAddress());
        }

        if (injectedProvider) {
            fetchAddress(injectedProvider);
        }
    }, [injectedProvider]);

    useEffect(() => {
        if (injectedProvider && address) {
            injectedProvider.on("block", (_) => {
                getBalance(injectedProvider);
            })
        } else {
            setBalance("-")
        }
    }, [injectedProvider, address])

    let modalButton = "";
    if (web3Modal) {
        if (web3Modal.cachedProvider) {
            modalButton = (
                <Button
                    onClick={logoutOfWeb3Modal}
                    >Disconnect</Button>
            );
        } else {
            modalButton = (
                <Button
                    onClick={loadWeb3Modal}
                    >Connect to Wallet</Button>
            );
        }
    }

    function truncateBalance(str, maxDecimalDigits) {
        if (str.includes('.')) {
            const parts = str.split('.');
            return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
        }
        return str;
    }

    function truncateAddress(str) {
        return str.substr(0, 5) + "..." + str.substr(str.length - 4, 5);
    }

    return (
        <Flex align="center">
            {injectedProvider &&
                (<>
                    <Box px="2">
                        <Text>
                            {balance} ETH
                        </Text>
                    </Box>
                    <Box px="2">
                        <Text>
                            {truncateAddress(address)}
                        </Text>
                    </Box>
                </>)
            }
            <Box ml="2">
                {modalButton}
            </Box>
        </Flex>
    );
};

export default Account;