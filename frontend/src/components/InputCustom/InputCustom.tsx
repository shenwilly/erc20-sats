import { Input, InputGroup, InputRightAddon, Box, Flex, Text } from "@chakra-ui/react"
import { ChangeEventHandler, MouseEventHandler } from "react";

interface InputCustomProps {
    value?: string | number,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onClickText?: MouseEventHandler<HTMLDivElement>,
    placeholder?: string,
    rightAddon?: JSX.Element,
    balanceText?: string | undefined,
}

const InputCustom: React.FC<InputCustomProps> = ({ 
    value="", 
    placeholder="0.00", 
    balanceText="-", 
    rightAddon, 
    onChange=() => {},
    onClickText=() => {},
 }) => {
    return (
        <Box position="relative">
            <InputGroup size="lg">
                <Input type="number" 
                    borderColor="orange"
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}/>
                <InputRightAddon borderColor="orange">
                    {rightAddon}
                </InputRightAddon>
            </InputGroup>
            <Flex 
                justifyContent="flex-end" 
                position="absolute" bottom="-27px" right="0" 
                cursor="pointer"
                onClick={onClickText}>
                <Text fontSize="sm">Balance: {balanceText}</Text>
                <Text fontSize="sm" pl="1" color="red">(Max)</Text>
            </Flex>
        </Box>
    );
};

export default InputCustom;