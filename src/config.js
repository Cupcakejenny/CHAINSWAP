import { createConfig } from '@wagmi/core'
import { mainnet, bsc } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

import { http } from 'wagmi'
const projectId = import.meta.env.VITE_PROJECT_ID

export const config = createConfig({
  chains: [mainnet, bsc],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, showQrModal: true }),
    new injected({ shimDisconnect: true }),
    new coinbaseWallet({ reloadOnDisconnect: true }),
  ],
})
