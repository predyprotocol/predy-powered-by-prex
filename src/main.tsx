import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { PrexUIKitSimpleProvider, usePrex } from '@prex0/uikit';
import { CHAIN_ID, USDC_TOKEN, WETH_TOKEN } from './constants.ts';
import '@prex0/uikit/styles.css';
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'; // [!code focus]
import { http, createConfig, useConnectorClient } from 'wagmi';
import { WagmiProvider } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  coinbaseWallet,
  rabbyWallet,
  okxWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'
import App from './App.tsx';

const queryClient = new QueryClient()

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        rabbyWallet,
        okxWallet,
        walletConnectWallet
      ]
    }
  ],
  {
    appName: 'Predy V6',
    projectId: 'fe2d9d4986f43c69cbe41422c9801ec3'
  }
)

export const config = createConfig({
  chains: [arbitrum],
  transports: {
    [arbitrum.id]: http()
  },
  connectors
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
          <PrexProviderWithConnector>
            <RainbowKitProvider modalSize='compact'>
              <App />
            </RainbowKitProvider>
          </PrexProviderWithConnector>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);


function PrexProviderWithConnector({ children }: { children: ReactNode }) {
  return (
    <PrexUIKitSimpleProvider
      chainId={CHAIN_ID}
      policyId={import.meta.env.VITE_POLICY_ID}
      apiKey={import.meta.env.VITE_API_KEY}
      tokens={[USDC_TOKEN, WETH_TOKEN]}
      useExternalWallet={true}
    >
      <InternalPrexProvider> 
        {children}
      </InternalPrexProvider>
    </PrexUIKitSimpleProvider>
  );
}

function InternalPrexProvider({ children }: { children: ReactNode }) {
  const client = useConnectorClient();
  const {setProvider} = usePrex();
 
  useEffect(() => {
    if(client.data) {
      setProvider(client.data as any);
    }
  }, [client.data, setProvider])

  return (
    <>
      {children}
    </>
  );
}