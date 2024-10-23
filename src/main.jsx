import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WagmiProvider } from 'wagmi'
import { config } from './config.js'
import './config.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './store.js'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiProvider config={config} reconnectOnMount={false}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </WagmiProvider>
)
