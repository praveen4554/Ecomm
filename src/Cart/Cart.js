import { useEffect } from "react";
import "./Cart.css";
import plus from "./plus.svg";
import minus from "./minus.svg";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../Redux/Reducer/Cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.itemCart?.items);
  const amount = cartItems?.reduce(
    (acc, cur) => acc + parseFloat(cur.price) * cur.quantity,
    0
  );
  const navigate = useNavigate();
  const navigateToCheckout = () => navigate("/checkout");
  const dispatch = useDispatch();
  const addQuantity = (item) => {
    dispatch(addItem(item));
  };
  const removeQuantity = (item) => {
    dispatch(removeItem(item));
  };
  console.log(cartItems);
  return (
    <div className="cart-wrapper">
      <div className="shopping-cart">
      <h3>Shopping cart</h3>
        {cartItems?.map((product, index) => (
          <div className="item" key={index}>
            <div className="image">
              <img src={product.img} alt={product.productName} width={120} height={80} />
            </div>

            <div className="description">
              <span>{product.productName}</span>
              <span>{product.color}</span>
            </div>
            <div className="total-price">${product.price}</div>

            <div className="quantity">
            <button
                className="minus-btn"
                type="button"
                onClick={() => removeQuantity(product)}
              >
                <img src={minus} alt="minus" />
              </button>
             
              <input type="text" value={product.quantity} readOnly />
              <button
                className="plus-btn"
                type="button"
                onClick={() => addQuantity(product)}
              >
                <img src={plus} alt="plus" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-section">
        <p>Subtotal: ${amount.toFixed(2)}</p>
        <button className="checkout-btn" onClick={navigateToCheckout}>
          Checkout
        </button>
        <p>Before taxes and shipping costs</p>
        <p>— or —</p>
        <div className="payment-buttons">
          <button className="shop-pay">Shop Pay</button>
          <button className="paypal">PayPal</button>
          <button className="gpay">Google Pay</button>
        </div>
        <div className="text">
          <p>+ Leave a note about your order</p>
          <p>+ Estimate shipping</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
