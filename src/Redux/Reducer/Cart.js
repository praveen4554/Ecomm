import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    count: 0
  },
  reducers: {
    addItem: (state, data) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      const items = state.items;
      const index = state.items.findIndex((val) => val._id === data.payload._id);
      const obj = {...data.payload}
      if(index === -1) {
        obj.quantity = 1;
        items.push(obj);
      } else {
        items[index].quantity +=1;
      }
      state.items = [...items];
      state.count +=1;
    },
    removeItem: (state, data) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      const items = state.items;
      const index = state.items.findIndex((val) => val._id === data.payload._id);
      const obj = {...data.payload}
      if(obj.quantity === 1) {
        items.splice(index,1);
      } else {
        items[index].quantity -=1;
      }
      state.items = [...items];
      state.count +=1;
    },
    reset: (state) => {
        state = {
            items: [],
            count: 0
        }
      }
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, reset } = cartSlice.actions;

export default cartSlice.reducer;