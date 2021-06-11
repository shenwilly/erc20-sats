import { Box, Image, Badge } from "@chakra-ui/react"
import WbtcLogo from "../../../../assets/img/wbtc.webp"
import InputCustom from "../../InputCustom";
import { ChangeEventHandler, MouseEventHandler } from "react";

interface InputSatsProps {
    value?: string | number,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onClickText?: MouseEventHandler<HTMLDivElement>,
    balanceText?: string
}

const InputSats: React.FC<InputSatsProps> = ({ value="", onChange=()=>{}, onClickText=()=>{}, balanceText }) => {
    const satsLogo = (
        <Box position="relative">
            <Image src={WbtcLogo} width="30px"/>
            <Badge position="absolute" 
                borderRadius="8" 
                colorScheme="orange"
                bottom="-5px"
                right="-5px">
                s
            </Badge>
        </Box>
    );
    return (
        <InputCustom 
            value={value}
            onChange={onChange}
            rightAddon={satsLogo}
            balanceText={balanceText}
            onClickText={onClickText}/>
    );
};

export default InputSats;