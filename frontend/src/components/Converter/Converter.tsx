import { Button, Box, SimpleGrid } from "@chakra-ui/react"
import { MdSwapVert } from "react-icons/md"
import styled from "styled-components";
import InputWbtc from "../InputCustom/variants/InputWbtc"
import InputSats from "../InputCustom/variants/InputSats"
import { useState } from "react";

const Converter = () => {
    const [ btcValue, setBtcValue ] = useState("");
    const [ satsValue, setSatsValue ] = useState("");
    const [ isBtcToSats, setIsBtcToSats ] = useState<boolean>(true);

    return (
        <Box textAlign="center" py="5" px="4" 
            borderWidth="2px" borderColor="gray.200" borderRadius="10" 
            width="40vw" display="flex-column">
            {isBtcToSats
                ? <InputWbtc 
                    value={btcValue}
                    onChange={e => setBtcValue(e.target.value)}
                    balanceText="0.1 BTC" />
                : <InputSats 
                    value={satsValue}
                    onChange={e => setSatsValue(e.target.value)}
                    balanceText="100.000 SATS" />}
            <SwapButton p="2" my="4" variant="ghost" onClick={() => setIsBtcToSats(!isBtcToSats)}>
                <MdSwapVert size="1.5em"/>
            </SwapButton>
            {!isBtcToSats
                ? <InputWbtc 
                    value={btcValue}
                    onChange={e => setBtcValue(e.target.value)}
                    balanceText="0.1 BTC" />
                : <InputSats 
                    value={satsValue}
                    onChange={e => setSatsValue(e.target.value)}
                    balanceText="100.000 SATS" />}
            <Button size="lg" colorScheme="orange" mt="60px" minW="200px">
                Approve
            </Button>
        </Box>
    );
};

const SwapButton = styled(Button)`

`;

export default Converter;