import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import SiteLayout from '@components/SiteLayout'
import { JsonRpcProvider } from '@ethersproject/providers'
// import { MetaMaskConnector } from '@wagmi/core/dist/declarations/src/connectors/metaMask'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import { IS_PRODUCTION } from 'src/constants'
import { chain, createClient, WagmiConfig } from 'wagmi'

import client from '../apollo'

export { reportWebVitals } from 'next-axiom'

// const { chains, provider } = configureChains(
//   [IS_MAINNET ? chain.polygon : chain.polygonMumbai],
//   [alchemyProvider({ alchemyId: ALCHEMY_KEY })]
// )

// const { chains, provider } = configureChains(
//   [chain.hardhat],
//   [getDefaultProvider]
// )

const ethProvider = new JsonRpcProvider(process.env.RPC_URL, chain.hardhat.id)
const connector = new MetaMaskConnector({ chains: [chain.hardhat] })

const wagmiClient = createClient({
  autoConnect: true,
  provider: ethProvider,
  connectors: [connector]
})

// const client = createClient({
//   connectors: [new InjectedConnector({ chains: [chain.hardhat] })
// })

// const connectors = () => {
//   return [
//     new InjectedConnector({
//       chains,
//       options: { shimDisconnect: true }
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: { rpc: { [CHAIN_ID]: ALCHEMY_RPC } }
//     })
//   ]
// }

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider
// })

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider(config) {
//     if()
//   }
// })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ThemeProvider>
      </ApolloProvider>
      {IS_PRODUCTION && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-18NFK33KC6"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-18NFK33KC6');
            `}
          </Script>
        </>
      )}
    </WagmiConfig>
  )
}

export default App
