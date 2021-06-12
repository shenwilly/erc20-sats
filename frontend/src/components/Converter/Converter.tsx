import { Button, Box } from "@chakra-ui/react"
import { MdSwapVert } from "react-icons/md"
import styled from "styled-components";
import InputWbtc from "../InputCustom/variants/InputWbtc"
import InputSats from "../InputCustom/variants/InputSats"
import { useEffect, useState } from "react";
import userSats from "../../hooks/useSats";
import { BigNumber } from "ethers";
import { getAllowance } from "../../utils/web3";
import { SATS_ADDRESS, WBTC_ADDRESS } from "../../constants";
import useWeb3 from "../../hooks/useWeb3";

const Converter = () => {
    const { accountAddress, injectedProvider } = useWeb3();
    const { wbtcBalance, satsBalance } = userSats();
    const [ btcValue, setBtcValue ] = useState("");
    const [ satsValue, setSatsValue ] = useState("");
    const [ isBtcToSats, setIsBtcToSats ] = useState<boolean>(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ allowanceApproved, setAllowanceApproved ] = useState(true);

    const handleClick = () => {

    }

    const changeBtcValue = async (val: string) => {
        if (val == "") {
            setBtcValue("");
            setSatsValue("")
        } else {
            setBtcValue(val);
            setSatsValue(BigNumber.from(val).mul(BigNumber.from(10).pow(8)).toString()) //temp
        }
    }

    const changeSatsValue = async (val: string) => {
        if (val == "") {
            setBtcValue("");
            setSatsValue("")
        } else {
            setSatsValue(val);
            setBtcValue(BigNumber.from(val).div(BigNumber.from(10).pow(8)).toString()) //temp
        }
    }

    const handleClickMaxBTC = () => {
        changeBtcValue(wbtcBalance?.toString() ?? "0")
    }

    const handleClickMaxSats = () => {
        changeSatsValue(satsBalance?.toString() ?? "0")
    }

    const checkAllowance = async () => {
        setIsLoading(true);
        if (btcValue === "" || btcValue === "0" || !injectedProvider) {
            setAllowanceApproved(true);
        } else {
            if (isBtcToSats) {
                const allowance = await getAllowance(accountAddress, SATS_ADDRESS, WBTC_ADDRESS, injectedProvider);
                if (BigNumber.from(allowance).lt(BigNumber.from(btcValue).mul(BigNumber.from(10).pow(8)))) {
                    setAllowanceApproved(false)
                } else {
                    setAllowanceApproved(true)
                }
            } else {
                setAllowanceApproved(true)
            }
        }
        setIsLoading(false);
    }

    const convertDisabled = () => {
        if (btcValue.length == 0)
            return true;

        if (BigNumber.from(btcValue).lte(0))
            return true;

        return false;
    }
    
    useEffect(() => {
        if (btcValue) {
            checkAllowance();
        }
    }, [btcValue])

    const InputWbtcElement = <InputWbtc 
        value={btcValue}
        onChange={e => changeBtcValue(e.target.value)}
        balanceText={`${wbtcBalance?.toNumber().toLocaleString() || '-'} WBTC`}
        onClickText={handleClickMaxBTC} />;

    const InputSatsElement = <InputSats 
        value={satsValue}
        onChange={e => changeSatsValue(e.target.value)}
        balanceText={`${satsBalance?.toNumber().toLocaleString() || '-'} SATS`} 
        onClickText={handleClickMaxSats} />

    return (
        <Box textAlign="center" py="5" px="4" 
            borderWidth="2px" borderColor="gray.200" borderRadius="10" 
            width="40vw" display="flex-column">
            {isBtcToSats
                ? InputWbtcElement
                : InputSatsElement}

            <SwapButton p="2" my="4" variant="ghost" onClick={() => setIsBtcToSats(!isBtcToSats)}>
                <MdSwapVert size="1.5em"/>
            </SwapButton>
            
            {!isBtcToSats
                ? InputWbtcElement
                : InputSatsElement}
                    
            <Button size="lg" colorScheme="orange" mt="60px" minW="200px" 
                onClick={handleClick}
                isLoading={isLoading}
                isDisabled={convertDisabled()}>
                {convertDisabled()
                    ? "INVALID INPUT"
                    : allowanceApproved
                        ? isBtcToSats 
                            ? "MINT $SATS"
                            : "REDEEM WBTC"
                        : "APPROVE"
                }
            </Button>
        </Box>
    );
};

const SwapButton = styled(Button)`

`;

export default Converter;