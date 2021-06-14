import { useCallback, useEffect, useState } from "react";
import { Button, Box } from "@chakra-ui/react"
import { MdSwapVert } from "react-icons/md"
import { BigNumber, ContractTransaction } from "ethers";
import { getAllowance } from "../../utils/web3";
import { SATS_ADDRESS, SATS_DECIMALS, WBTC_ADDRESS, WBTC_DECIMALS } from "../../constants";
import { btcStringToBN, btcToSats, satsStringToBN, satsToBtc } from "../../utils/sats";
import { formatUnits } from "ethers/lib/utils";
import useWeb3 from "../../hooks/useWeb3";
import useSats from "../../hooks/useSats";
import InputWbtc from "../InputCustom/variants/InputWbtc"
import InputSats from "../InputCustom/variants/InputSats"

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
        
        if (!isBtcToSats) {
            const satsAmount = satsStringToBN(satsValue)
            handleBurn(
                satsAmount.toString(),
                () => {}
            );
        } else {
            const btcAmount = btcStringToBN(btcValue)
            if (allowanceApproved) {
                handleMint(
                    btcAmount.toString(),
                    () => {}
                );
            } else {
                handleApprove(
                    btcAmount.toString(),
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
                console.log(error)
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
                console.log(error)
                setBtcValue("")
            }
        }
    }

    const handleClickMaxBTC = () => {
        const value = formatUnits(wbtcBalance, WBTC_DECIMALS) ?? "0"
        changeBtcValue(value.replace(",", "."))
    }

    const handleClickMaxSats = () => {
        const value = formatUnits(satsBalance, SATS_DECIMALS) ?? "0"
        changeSatsValue(value.replace(".0",""))
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

        const btcAmount = btcStringToBN(btcValue)
        const satsAmount = satsStringToBN(satsValue)
        if (btcAmount.lte(0) || btcAmount.lte(0)) {
            setValidationErrorMsg("INPUT POSITIVE AMOUNT");
            return;
        }
        
        if (isBtcToSats && btcAmount.gt(wbtcBalance || BigNumber.from(0))) {
            setValidationErrorMsg("AMOUNT TOO LARGE");
            return;
        }

        if (!isBtcToSats && satsAmount.gt(satsBalance || BigNumber.from(0))) {
            setValidationErrorMsg("AMOUNT TOO LARGE");
            return;
        }

        setValidationErrorMsg("");
    }, [btcValue, satsValue, wbtcBalance, satsBalance, isBtcToSats])
    
    useEffect(() => {
        if (btcValue) {
            checkAllowance();
        }
    }, [btcValue, checkAllowance])

    const InputWbtcElement = <InputWbtc 
        value={btcValue}
        onChange={e => changeBtcValue(e.target.value)}
        balanceText={`${formatUnits(wbtcBalance, WBTC_DECIMALS).toLocaleString() || '-'} WBTC`}
        onClickText={handleClickMaxBTC} />;

    const InputSatsElement = <InputSats 
        value={satsValue}
        onChange={e => changeSatsValue(e.target.value)}
        balanceText={`${formatUnits(satsBalance, SATS_DECIMALS).toLocaleString() || '-'} SATS`} 
        onClickText={handleClickMaxSats} />

    return (
        <Box textAlign="center" py="5" px="4" 
            borderWidth="2px" borderColor="gray.200" borderRadius="10" 
            display="flex-column">
            {isBtcToSats
                ? InputWbtcElement
                : InputSatsElement}

            <Button p="2" mb="4" mt="8" variant="ghost" onClick={() => setIsBtcToSats(!isBtcToSats)}>
                <MdSwapVert size="1.5em"/>
            </Button>
            
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

export default Converter;