import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useAccount, useConnect } from 'wagmi'
import { connect, injected } from '@wagmi/core'
import { config } from '../config'
import Footer from './Footer'
const HomeLayout = () => {
  return (
    <div>
      <Header />
      <div className="align-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default HomeLayout
