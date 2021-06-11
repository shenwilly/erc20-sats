import { Image } from "@chakra-ui/react"
import WbtcLogo from "../../../../assets/img/wbtc.webp"
import InputCustom from "../../InputCustom";
import { ChangeEventHandler, MouseEventHandler } from "react";

interface InputWbtcProps {
    value?: string | number,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onClickText?: MouseEventHandler<HTMLDivElement>,
    balanceText?: string
}

const InputWbtc: React.FC<InputWbtcProps> = ({ value="", onChange=()=>{}, onClickText=()=>{}, balanceText }) => {
    const wbtcLogo = <Image src={WbtcLogo} width="30px"/>;
    return (
        <InputCustom 
            value={value}
            onChange={onChange}
            placeholder="0.00 WBTC" 
            rightAddon={wbtcLogo}
            balanceText={balanceText}
            onClickText={onClickText}/>
    );
};

export default InputWbtc;