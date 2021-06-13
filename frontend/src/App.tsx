import React from "react"
import { Container, Box, Text, Stack, Center, ChakraProvider } from "@chakra-ui/react"
import styled, { ThemeProvider } from "styled-components";
import { web3Modal } from "./utils/web3modal";
import { Web3Provider } from "./contexts/Web3"
import theme from "./utils/theme"
import Header from "./components/Header"
import Footer from "./components/Footer";
import Converter from "./components/Converter";
import { SatsProvider } from "./contexts/Sats";

function App() {
  return (
    <SiteWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <BodyWrapper maxW="container.xl" display="flex" alignItems="start" justifyContent="center">
        <Stack alignItems="center">
          <BtcSatsExchangeRateBox />
          <Box width={['90vw', '60vw', '40vw']}>
            <Converter />
          </Box>
        </Stack>
      </BodyWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </SiteWrapper>
  );
}

const SiteWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`;

const HeaderWrapper = styled(Center)`
  height: 60px;
`;

const BodyWrapper = styled(Container)`
  height: calc(100vh - 60px);
`;

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 15px;
  left: 0;
`;

const BtcSatsExchangeRateBox = () => (
  <Box display="block" bg="orange" py="2" px="3" borderRadius="5" mb="5" mt="10">
  <Text fontWeight="bold">
      1 $WBTC = 100,000,000 $SATS
  </Text>
  </Box>
)

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
  const styledTheme = {
    
  };

  return (
    <ThemeProvider theme={styledTheme}>
      <ChakraProvider theme={theme}>
        <Web3Provider>
          <SatsProvider>
            {children}
          </SatsProvider>
        </Web3Provider>
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