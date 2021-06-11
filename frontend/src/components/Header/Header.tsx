import React from "react"
import { Container, Box, Flex, Spacer, Text } from "@chakra-ui/react"
import styled from "styled-components"
import Account from "../Account"
import useWeb3 from "../../hooks/useWeb3"

const Header = () => {
    const { web3Modal, loadWeb3Modal, logoutOfWeb3Modal, injectedProvider } = useWeb3()

    return (
        <Container maxW="container.xl" color="teal">
            <StyledRow align="center">
                <Text>$SATS</Text>
                <Spacer/>
                <Box>
                    <Account
                        web3Modal={web3Modal}
                        loadWeb3Modal={loadWeb3Modal}
                        logoutOfWeb3Modal={logoutOfWeb3Modal}
                        injectedProvider={injectedProvider}/>
                </Box>
            </StyledRow>
        </Container>
    );
};

const StyledRow = styled(Flex)`
    height: 60px;
`

export default Header;