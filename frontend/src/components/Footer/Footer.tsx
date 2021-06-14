import { Container, Flex, Spacer, Button, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa";

const Footer = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Container maxW="container.xl">
            <Flex align="center" pr="1">
                <Button onClick={toggleColorMode} p="2" size="md" variant="ghost">
                    {colorMode === "light" 
                        ? <FaSun />
                        : <FaMoon />}
                </Button>
                <Spacer/>
                <Button onClick={toggleColorMode} p="2" size="md" variant="ghost">
                    {colorMode === "light" 
                        ? <FaSun />
                        : <FaMoon />}
                </Button>
                <Button onClick={toggleColorMode} p="2" size="md" variant="ghost">
                    {colorMode === "light" 
                        ? <FaSun />
                        : <FaMoon />}
                </Button>
            </Flex>
        </Container>
    );
};

export default Footer;