import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isConnected: false,
}

const wagmiSlice = createSlice({
  name: 'wagmi',
  initialState,
})

export default wagmiSlice.reducer
