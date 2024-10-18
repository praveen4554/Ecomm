import { useEffect } from 'react';
import './Cart.css';
import plus from './plus.svg';
import minus from './minus.svg';
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../Redux/Reducer/Cart";
import {  useNavigate } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector((state) => state.itemCart?.items);
    const amount = cartItems?.reduce((acc, cur) => acc + parseFloat(cur.price) * cur.quantity, 0);
    const navigate = useNavigate(); 
    const navigateToCheckout = () => navigate('/checkout');
    const dispatch = useDispatch();
    const addQuantity = (item) => {
        dispatch(addItem(item));
    }
    const removeQuantity = (item) => {
        dispatch(removeItem(item));
    }

    return (
        <div className="cart-cotainer">
        <div className="shopping-cart">
            <div className="title">
                Shopping Bag
            </div>

            {cartItems?.map((product, index) => <div className="item" key={index}>
                <div className="buttons">
                    <span className="delete-btn"></span>
                    <span className="like-btn"></span>
                </div>

                <div className="image">
                    <img src={product.img} alt="" width={120} height={80} />
                </div>

                <div className="description">
                    <span>{product.productName}</span>
                    <span>{product.color}</span>
                </div>

                <div className="quantity">
                    <button className="plus-btn" type="button" name="button" onClick={() => addQuantity(product)}>
                        <img src={plus} alt="" />
                    </button>
                    <input type="text" name="name" value={product.quantity} />
                    <button className="minus-btn" type="button" name="button" onClick={() => removeQuantity(product)}>
                        <img src={minus} alt="" />
                    </button>
                </div>

                <div className="total-price">${product.price}</div>
            </div>)}
            <div className="total-price-detail"><span>Total: ${amount}</span></div>
        </div>
            <div className="next"><button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={navigateToCheckout}>
                Proceed to Checkout
            </button></div>
            </div>
    )
}

export default Cart;