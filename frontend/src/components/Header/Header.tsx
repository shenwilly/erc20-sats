import { Container, Box, Flex, Spacer, Text } from "@chakra-ui/react"
import Account from "../Account"
import useWeb3 from "../../hooks/useWeb3"

const Header = () => {
    const { web3Modal, loadWeb3Modal, logoutOfWeb3Modal, injectedProvider, account } = useWeb3()

    return (
        <Container maxW="container.xl">
            <Flex align="center">
                <Text textStyle="appTitle" color="orange">$SATS</Text>
                <Spacer/>
                <Box>
                    <Account
                        web3Modal={web3Modal}
                        loadWeb3Modal={loadWeb3Modal}
                        logoutOfWeb3Modal={logoutOfWeb3Modal}
                        injectedProvider={injectedProvider}
                        account={account}/>
                </Box>
            </Flex>
        </Container>
    );
};

export default Header;