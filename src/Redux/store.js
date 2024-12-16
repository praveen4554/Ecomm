import { configureStore } from '@reduxjs/toolkit';
import productReducer from  './Reducer/Products';
import cartReducer from './Reducer/Cart';
import userReducer from './Reducer/User';

export default configureStore({
  reducer: {
    products: productReducer,
    itemCart: cartReducer,
    user: userReducer
  },
})