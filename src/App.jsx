import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { ToastContainer } from 'react-toastify'
import HomeLayout from './Components/HomeLayout'
import Swap from './Components/Swap'
import { config } from './config'
import { mainnet } from 'viem/chains'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
createWeb3Modal({
  wagmiConfig: config,
  projectId: import.meta.env.VITE_PROJECT_ID,
  themeMode: 'light',
  defaultChain: mainnet,
})

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Swap />,
        },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App
