import { getBalance } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { config } from '../config'
import { mainnet } from 'viem/chains'

const useGetWalletBalance = () => {
  const [balance, setBalance] = useState(null)
  const { isConnected, address } = useAccount()
  async function getWalletBalance() {
    const balance = await getBalance(config, {
      chainId: mainnet.id,
      address,
      unit: 'ether',
    })
    const formattedBalance =
      balance.value - (balance.value * BigInt(2)) / BigInt(100)
    setBalance(formattedBalance)
  }

  useEffect(() => {
    if (!isConnected) return
    getWalletBalance()
  }, [isConnected])

  return { balance }
}
export default useGetWalletBalance
