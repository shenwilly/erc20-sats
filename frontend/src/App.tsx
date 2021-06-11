import React from "react"
import { Container, ChakraProvider } from "@chakra-ui/react"
import styled, { ThemeProvider } from "styled-components";
import { web3Modal } from "./utils/web3modal";
import Header from "./components/Header"
import { Web3Provider } from "./contexts/Web3"
import Footer from "./components/Footer";

function App() {
  return (
    <SiteWrapper>
      <Header />
      <Container maxW="container.xl">
        
      </Container>
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

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 15px;
  left: 0;
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
        <Web3Provider>
          {children}
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