import { Container, Flex, Spacer, Button, useColorMode, Image } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa";
import GithubLogo from "../../assets/img/github.png";
import EtherscanLogo from "../../assets/img/etherscan.png";

const Footer = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <Container maxW="container.xl">
            <Flex align="center" pr="1">
                <Button onClick={toggleColorMode} p="2" size="md" variant="ghost">
                    {colorMode === "light" 
                        ? <FaSun />
                        : <FaMoon />}
                </Button>
                <Spacer/>
                <Button onClick={() => openInNewTab("https://etherscan.io/address/0xa5584c19ac937771cc0f6b7c19a36c36b0baf9a0")} 
                    p="2" size="md" variant="ghost"
                >
                    <Image src={EtherscanLogo} fit="contain" width="24px" />
                </Button>
                <Button onClick={() => openInNewTab("https://github.com/shenwilly/erc20-sats")} 
                    p="2" size="md" variant="ghost"
                >
                    <Image src={GithubLogo} fit="contain" width="24px" />
                </Button>
            </Flex>
        </Container>
    );
};

export default Footer;