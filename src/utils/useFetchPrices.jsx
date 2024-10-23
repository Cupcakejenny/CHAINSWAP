import Moralis from 'moralis'
import { useEffect, useState } from 'react'
const useFetchPrices = () => {
  const [prices, setPrices] = useState(null)
  async function fetchPrices(one, two) {
    if (Moralis.Core.isStarted) return
    try {
      await Moralis.start({
        apiKey: import.meta.env.VITE_API_KEY,
      })

      const response1 = await Moralis.EvmApi.token.getTokenPrice({
        address: one,
      })
      const response2 = await Moralis.EvmApi.token.getTokenPrice({
        address: two,
      })

      const usdPrices = {
        tokenOne: response1.toJSON().usdPrice,
        tokenTwo: response2.toJSON().usdPrice,
        ratio: response1.toJSON().usdPrice / response2.toJSON().usdPrice,
      }
      setPrices(usdPrices)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPrices(
      '0x5bb15141bb6def6d2bafeed8ff84bf889c0c573b',
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    )
  }, [])

  return { prices }
}
export default useFetchPrices
