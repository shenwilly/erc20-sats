import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { Button, Box, Flex, Text, useDisclosure } from "@chakra-ui/react"
import AccountModal from "../AccountModal";

const Account = ({ web3Modal, loadWeb3Modal, logoutOfWeb3Modal, injectedProvider, address }) => {
    const [ balance, setBalance ] = useState("-");
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const getBalance = async (provider) => {
            let balance = await provider.getBalance(address);
            setBalance(truncateBalance(formatEther(balance), 4));
        }

        if (injectedProvider && address) {
            injectedProvider.on("block", (_) => {
                getBalance(injectedProvider);
            })
        } else {
            setBalance("-")
        }
    }, [injectedProvider, address])
    
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
                (<Box display="flex" bg="orange" p="2" borderRadius="8" onClick={onOpen} cursor="pointer">
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
                </Box>)
            }
            <Box ml="2">
                {web3Modal && !web3Modal.cachedProvider &&
                    <Button
                        onClick={loadWeb3Modal}
                        bg="orange"
                    >Connect to Wallet</Button>}
            </Box>
            <AccountModal 
                isOpen={isOpen} 
                onClose={onClose}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                address={address} />
        </Flex>
    );
};

export default Account;