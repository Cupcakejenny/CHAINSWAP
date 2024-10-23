import { FaMedium, FaTelegram, FaTwitter } from 'react-icons/fa'
import { SiBookstack } from 'react-icons/si'
import { Link } from 'react-router-dom'
const footerLinks = [
  { id: 1, url: 'https://twitter.com/chainswaperc', icon: <FaTwitter /> },
  {
    id: 2,
    url: 'https://medium.com/@chainswaperc20',
    icon: <FaMedium />,
  },
  {
    id: 3,
    url: 'https://t.me/ChainSwapPortal',
    icon: <FaTelegram />,
  },
  {
    id: 4,
    url: 'https://chainswap-2.gitbook.io/chainswap-defy-limits-embrace-anonymity',
    icon: <SiBookstack />,
  },
]
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
        <p>Email:team@chain-swap.org</p>
        <p>ENS:Chainswapdev</p>
      </div>
      <div className="footer-links">
        {footerLinks.map((link) => {
          return (
            <Link target="_blank" key={link.id} to={link.url}>
              {link.icon}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default Footer
