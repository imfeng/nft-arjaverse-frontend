import React from "react";
import "../styles/globals.scss";
import "../styles/homePage.scss";
// rainbow-kit 設定
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Header from "../components/Header/Header";
import Head from "next/head";
import Logo from "../../src/assets/images/logo.ico";

const emotionCache = createCache({
  key: "style",
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});

const colors = { yellow: "#FAC92E", darkBlue: "#425673" };
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
        color: "black",
        fontFamily: "",
      },
    }),
  },
  colors,
});

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    alchemyProvider({ apiKey: "5Rbut6tuZaLXz2YsqwJ7Uj3TKtAVkinZ" }),
    // publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Arjaverse!</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Palanquin+Dark:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href={Logo.src} />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <CacheProvider value={emotionCache}>
            <ChakraProvider theme={theme}>
              <Header />
              <div className="pt-20">
                <Component {...pageProps} />
              </div>
            </ChakraProvider>
          </CacheProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
