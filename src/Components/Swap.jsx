import { useState } from 'react'
import { Input, Popover, Radio, Modal } from 'antd'
import { ArrowDownOutlined, SettingOutlined } from '@ant-design/icons'
import { useAccount, useSendTransaction } from 'wagmi'
import tokenList from '../tokenList.json'
import { toast } from 'react-toastify'
import useFetchPrices from '../utils/useFetchPrices'
import useApproveTransaction from '../utils/useApproveTransaction'

function Swap() {
  const { prices } = useFetchPrices()
  const { approve } = useApproveTransaction()
  const { isPending } = useSendTransaction()
  const { isConnected, address } = useAccount()
  const [slippage, setSlippage] = useState(2.5)
  const [tokenOneAmount, setTokenOneAmount] = useState(null)
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null)
  const [tokenOne, setTokenOne] = useState(tokenList[0])
  const [tokenTwo, setTokenTwo] = useState(tokenList[1])
  const [isOpen, setIsOpen] = useState(false)
  const [changeToken, setChangeToken] = useState(1)

  function handleSlippageChange(e) {
    setSlippage(e.target.value)
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value)
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
    } else {
      setTokenTwoAmount(null)
    }
  }

  function openModal(asset) {
    setChangeToken(asset)
  }

  // function modifyToken(i) {
  //   setPrices(null)
  //   setTokenOneAmount(null)
  //   setTokenTwoAmount(null)
  //   if (changeToken === 1) {
  //     setTokenOne(tokenList[i])
  //     fetchPrices(tokenList[i].address, tokenTwo.address)
  //     console.log(tokenList[i].address)
  //   } else {
  //     setTokenTwo(tokenList[i])
  //     fetchPrices(tokenOne.address, tokenList[i].address)
  //   }
  //   setIsOpen(false)
  // }

  isPending && toast.info('pending wallet confirmation')

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  )

  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            )
          })}
        </div>
      </Modal>

      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>Swap</h4>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <SettingOutlined className="cog" />
          </Popover>
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!address}
          />
          <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
          <div className="switchButton">
            <ArrowDownOutlined className="switchArrow" />
          </div>

          <div className="assetOne" onClick={() => openModal(1)}>
            <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
            {tokenOne.ticker}
          </div>
          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
            {tokenTwo.ticker}
          </div>
        </div>
        <div
          onClick={approve}
          className="swapButton"
          disabled={!tokenOneAmount || !isConnected}
        >
          Swap
        </div>
      </div>
    </>
  )
}

export default Swap
