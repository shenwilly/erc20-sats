import { Container, Flex, Spacer, Button, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa";

const Footer = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Container maxW="container.xl">
            <Flex align="center">
                <Button onClick={toggleColorMode} size="md" variant="ghost">
                    {colorMode === "light" 
                        ? <FaSun />
                        : <FaMoon />}
                </Button>
                <Spacer/>
            </Flex>
        </Container>
    );
};

export default Footer;