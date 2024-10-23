import Logo from '../nav-logo.png'
import Eth from '../eth.svg'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Link } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import { config } from '../config'
function Header() {
  const { isConnected, address } = useAccount({ ...config })
  const { disconnect, connectors } = useDisconnect({
    ...config,
    mutation: {
      onSettled: (data, error) => console.log(data, error, 'settled'),
      onError: (error) => console.log(error),
    },
  })
  const { open } = useWeb3Modal()
  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem1">Swap</div>
        </Link>
        {/* <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link> */}
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={Eth} alt="eth" className="eth" />
          Ethereum
        </div>
        {isConnected ? (
          <>
            {/* <div>
              {address.slice(0, 4) + '...' + address.slice(38)}
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'gray',
                  cursor: 'pointer',
                }}
                onClick={() => disconnect()}
              >
                disconnect
              </div>
            </div> */}
            <w3m-account-button balance="hide" />
          </>
        ) : (
          <w3m-button />
        )}
      </div>
    </header>
  )
}

export default Header
