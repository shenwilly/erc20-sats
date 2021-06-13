import { Button, Box } from "@chakra-ui/react"
import { MdSwapVert } from "react-icons/md"
import styled from "styled-components";
import InputWbtc from "../InputCustom/variants/InputWbtc"
import InputSats from "../InputCustom/variants/InputSats"
import { useCallback, useEffect, useState } from "react";
import useSats from "../../hooks/useSats";
import { BigNumber, ContractTransaction } from "ethers";
import { getAllowance } from "../../utils/web3";
import { SATS_ADDRESS, WBTC_ADDRESS } from "../../constants";
import useWeb3 from "../../hooks/useWeb3";
import { btcStringToBN, btcToSats, satsToBtc } from "../../utils/sats";

const Converter = () => {
    const { accountAddress, injectedProvider } = useWeb3();
    const { wbtcBalance, satsBalance, handleApprove, handleMint, handleBurn } = useSats();
    const [ btcValue, setBtcValue ] = useState("");
    const [ satsValue, setSatsValue ] = useState("");
    const [ isBtcToSats, setIsBtcToSats ] = useState<boolean>(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ allowanceApproved, setAllowanceApproved ] = useState(true);
    const [ validationErrorMsg, setValidationErrorMsg ] = useState("");

    const handleClick = async () => {
        if (!injectedProvider)
            return;

        if (isBtcToSats) {
            handleBurn(
                BigNumber.from(btcValue).mul(BigNumber.from(10).pow(8)).toString(),
                () => {}
            );
        } else {
            if (allowanceApproved) {
                handleMint(
                    BigNumber.from(btcValue).mul(BigNumber.from(10).pow(8)).toString(),
                    () => {}
                );
            } else {
                handleApprove(
                    BigNumber.from(btcValue).mul(BigNumber.from(10).pow(8)).toString(),
                    async (tx: ContractTransaction) => {
                        const txReceipt = await injectedProvider.getTransactionReceipt(tx.hash);
                        if (txReceipt && txReceipt.blockNumber) {
                            checkAllowance()
                        }                    
                    }
                );
            }
        }
    }

    const changeBtcValue = async (val: string) => {
        if (val === "") {
            setBtcValue("");
            setSatsValue("")
        } else {
            setBtcValue(val);

            try {
                setSatsValue(btcToSats(val))
            } catch (error) {
                setSatsValue("")
            }
        }
    }

    const changeSatsValue = async (val: string) => {
        if (val === "") {
            setBtcValue("");
            setSatsValue("")
        } else {
            setSatsValue(val);

            try {
                setBtcValue(satsToBtc(val))
            } catch (error) {
                setBtcValue("")
            }
        }
    }

    const handleClickMaxBTC = () => {
        changeBtcValue(wbtcBalance?.toString() ?? "0")
    }

    const handleClickMaxSats = () => {
        changeSatsValue(satsBalance?.toString() ?? "0")
    }

    const checkAllowance = useCallback(async () => {
        setIsLoading(true);

        let approved = false;
        if (btcValue === "" || btcValue === "0" || !injectedProvider) {
            approved = true;
        } else {
            if (isBtcToSats) {
                try {
                    const btcAmount = btcStringToBN(btcValue)
                    const allowance = await getAllowance(accountAddress, SATS_ADDRESS, WBTC_ADDRESS, injectedProvider);
                    if (BigNumber.from(allowance).gte(btcAmount)) {
                        approved = true
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                approved = true
            }
        }
        setAllowanceApproved(approved);

        setIsLoading(false);
    }, [accountAddress, btcValue, injectedProvider, isBtcToSats]);

    useEffect(() => {
        if (btcValue.length === 0) {
            setValidationErrorMsg("INPUT AMOUNT");
            return;
        }

        if (btcValue.length >= 0 && satsValue.length === 0) {
            setValidationErrorMsg("INVALID WBTC AMOUNT");
            return;
        }

        if (satsValue.length >= 0 && btcValue.length === 0) {
            setValidationErrorMsg("INVALID SATS AMOUNT");
            return;
        }

        let btcAmount = BigNumber.from(0);
        try {
            btcAmount = btcStringToBN(btcValue)
        } catch (error) {
            console.log(error)
        }

        if (btcAmount.lte(0)) {
            setValidationErrorMsg("INPUT POSITIVE AMOUNT");
            return;
        }
        
        if (btcAmount.gt(wbtcBalance || BigNumber.from(0))) {
            setValidationErrorMsg("AMOUNT TOO LARGE");
            return;
        }

        setValidationErrorMsg("");
    }, [btcValue, satsValue, wbtcBalance])
    
    useEffect(() => {
        if (btcValue) {
            checkAllowance();
        }
    }, [btcValue, checkAllowance])

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
            display="flex-column">
            {isBtcToSats
                ? InputWbtcElement
                : InputSatsElement}

            <SwapButton p="2" mb="4" mt="8" variant="ghost" onClick={() => setIsBtcToSats(!isBtcToSats)}>
                <MdSwapVert size="1.5em"/>
            </SwapButton>
            
            {!isBtcToSats
                ? InputWbtcElement
                : InputSatsElement}
                    
            <Button size="lg" colorScheme="orange" mt="60px" minW="200px" 
                onClick={handleClick}
                isLoading={isLoading}
                isDisabled={validationErrorMsg.length > 0}>
                {validationErrorMsg.length > 0
                    ? validationErrorMsg
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