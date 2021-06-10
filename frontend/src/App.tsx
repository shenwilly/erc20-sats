import React from "react"
import { Container, Box, ChakraProvider } from "@chakra-ui/react"
import styled, { ThemeProvider } from "styled-components";
import { web3Modal } from "./utils/web3modal";
// import Header from "./components/Header"
// import { Web3Provider } from "./contexts/Web3"

function App() {
  return (
    <SiteWrapper>
      <Container maxW="container.xl">
        <Box>
          SATS
        </Box>
      </Container>
    </SiteWrapper>
  );
}

const SiteWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: lightgrey;
`;

window.ethereum &&
  window.ethereum.on("chainChanged", () => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });

window.ethereum &&
  window.ethereum.on("accountsChanged", () => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });

const Providers: React.FC = ({ children }) => {
  const theme = {
    
  };

  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        {/* <ApolloProvider client={client}> */}
          {/* <Web3Provider> */}
            {children}
          {/* </Web3Provider> */}
        {/* </ApolloProvider> */}
      </ChakraProvider>
    </ThemeProvider>
  );
};

function withProviders<P>(
  Component: React.ComponentType<P>
) {
  const ComponentProviders = (props: P) => {
    return (
      <Providers>
        <Component {...props}/>
      </Providers>
    )
  };
  return ComponentProviders;
}

export default withProviders(App);