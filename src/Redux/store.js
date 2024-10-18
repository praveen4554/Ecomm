import { configureStore } from '@reduxjs/toolkit';
import productReducer from  './Reducer/Products';
import cartReducer from './Reducer/Cart';

export default configureStore({
  reducer: {
    products: productReducer,
    itemCart: cartReducer
  },
})