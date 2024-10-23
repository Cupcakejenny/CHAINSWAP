import { configureStore } from '@reduxjs/toolkit'
import wagmiSlice from './features/swap/swapSlice'
const store = configureStore({
  reducer: {
    wagmi: wagmiSlice,
  },
})

export default store
