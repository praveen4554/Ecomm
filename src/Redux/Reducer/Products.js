import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [],
  },
  reducers: {
    addAllProducts: (state, data) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.productList = [...data?.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { addAllProducts } = productsSlice.actions;

export default productsSlice.reducer;