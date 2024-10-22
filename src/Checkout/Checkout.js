import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../Redux/Reducer/Cart';
import { db } from '../Firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";


const Checkout = () => {
    const cartItems = useSelector((state) => state.itemCart?.items);
    const [emailId, setEmailId] = useState('');
    const [isAddressFilled, setIsAddressFilled] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('Ship');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
    });
    const [saveInfo, setSaveInfo] = useState(false);
    const [billingSame, setBillingSame] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const amount = cartItems?.reduce(
        (acc, cur) => acc + parseFloat(cur.price) * cur.quantity,
        0
    );
    const tax = 8.01;

    const allStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
        'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal', 'Andaman and Nicobar Islands',
        'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async () => {
        const { firstName, lastName, address, city, state, zip } = formData;
        if (!emailId || !firstName || !lastName || !address || !city || !state || !zip) {
            alert('Please fill in all required fields');
            return;
        }
        console.log({
            productList: cartItems,
            emailId,
            addressDetails: `${address} ${city} ${state} ${zip}`,
        });
        // try {
        //     await axios.post('http://localhost:2999/getOrder', {
        //         productList: cartItems,
        //         emailId,
        //         addressDetails: `${address} ${city} ${state} ${zip}`,
        //     }, {
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        //     alert('Order placed successfully');
        //     dispatch(reset());
        //     navigate('/');
        // } catch (err) {
        //     console.error('Order placement failed:', err);
        // }
        try {
            const docRef = await addDoc(collection(db, "Orders"), {
                productList: cartItems,
                emailId,
                addressDetails: `${address} ${city} ${state} ${zip}`,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-20 py-10">
            {/* Left Section */}
            <div className="h-screen overflow-y-scroll pr-4 ">
                <p className="text-center text-gray-500 mb-4">Express checkout</p>
                <div className="payment-button flex justify-between items-center space-x-4 mb-4">
                    <button className="shop-pay bg-purple-600 text-white w-full py-3 rounded-md font-semibold text-lg">
                        <span className="text-white">Shop</span>
                        <span className="ml-1 bg-white text-purple-600 p-1 rounded">Pay</span>
                    </button>
                    <button className="paypal bg-yellow-500 text-blue-800 w-full py-3 rounded-md font-semibold text-lg">
                        PayPal
                    </button>
                    <button className="gpay bg-black text-white w-full py-3 rounded-md font-semibold text-lg">
                        Google Pay
                    </button>
                </div>
                <p className="text-center text-gray-500">—— OR ——</p>
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-md mb-4"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                />
                <div className="flex items-center mb-6">
                    <input type="checkbox" id="offers" className="mr-2" />
                    <label htmlFor="offers">Email me with news and offers</label>
                </div>

                <h2 className="text-xl font-semibold mb-4">Delivery</h2>
                <div className="flex items-center space-x-4 mb-6">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'Ship'}
                            onChange={() => setDeliveryMethod('Ship')}
                        />
                        <span>Ship</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'Pickup'}
                            onChange={() => setDeliveryMethod('Pickup')}
                        />
                        <span>Pickup in store</span>
                    </label>
                </div>

                <select className="w-full p-3 border rounded-md mb-4">
                    <option value="">Country/Region</option>
                    <option value="IN">India</option>
                    <option value="US">USA</option>
                    <option value="Uk">UK</option>
                </select>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        className="p-3 border rounded-md"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        className="p-3 border rounded-md"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>

                <input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    className="w-full p-3 border rounded-md mb-4"
                    value={formData.company}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full p-3 border rounded-md mb-4"
                    value={formData.address}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full p-3 border rounded-md mb-4"
                    value={formData.apartment}
                    onChange={handleInputChange}
                />

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="p-3 border rounded-md"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                    <select
                        name="state"
                        className="p-3 border rounded-md"
                        value={formData.state}
                        onChange={handleInputChange}
                    >
                        <option value="">State</option>
                        {allStates.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="zip"
                        placeholder="ZIP Code"
                        className="p-3 border rounded-md"
                        value={formData.zip}
                        onChange={handleInputChange}
                    />
                </div>

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone (optional)"
                    className="w-full p-3 border rounded-md"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                <div className="p-4 bg-gray-50 rounded-md">
                    {isAddressFilled ? (
                        ['Standard', 'Express'].map((method) => (
                            <div key={method}>
                                <input
                                    type="radio"
                                    id={method}
                                    name="shippingMethod"
                                    checked={deliveryMethod === method}
                                    onChange={() => setDeliveryMethod(method)}
                                />
                                <label htmlFor={method} className="ml-2">
                                    {method} Shipping
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>Enter your address to view shipping options.</p>
                    )}
                </div>
                <h2 className="text-xl font-semibold mt-8 mb-4">Payment</h2>
                <p className="text-sm text-gray-500 mb-4">
                    All transactions are secure and encrypted.
                </p>
                <div className="border p-4 rounded-md mb-4">
                    <div className="border p-4 rounded-md mb-4">
                        {/* Credit Card Payment Method */}
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                checked={paymentMethod === 'Credit Card'}
                                onChange={() => setPaymentMethod('Credit Card')}
                            />
                            <label className="ml-2">Credit Card</label>
                        </div>

                        {/* New Radio Button - UPI */}
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                checked={paymentMethod === 'UPI'}
                                onChange={() => setPaymentMethod('UPI')}
                            />
                            <label className="ml-2">PayPal</label>
                        </div>

                        {/* New Radio Button - Pay on Delivery */}
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                checked={paymentMethod === 'Pay on Delivery'}
                                onChange={() => setPaymentMethod('Pay on Delivery')}
                            />
                            <label className="ml-2">Shoppay</label>
                        </div>

                        {/* Conditional Rendering for Credit Card Fields */}
                        {paymentMethod === 'Credit Card' && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Card number"
                                    className="w-full p-3 border rounded-md mb-4"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Expiration date (MM / YY)"
                                        className="p-3 border rounded-md"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Security code"
                                        className="p-3 border rounded-md"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Name on card"
                                    className="w-full p-3 border rounded-md mt-4"
                                />
                            </>
                        )}

                        {/* Conditional Rendering for UPI Payment */}
                        {paymentMethod === 'UPI' && (
                            <input
                                type="text"
                                placeholder="Enter PayPal ID"
                                className="w-full p-3 border rounded-md mt-4"
                            />
                        )}


                        {/* Billing Address Checkbox */}
                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                checked={billingSame}
                                onChange={() => setBillingSame(!billingSame)}
                            />
                            <label className="ml-2">Same as shipping address</label>


                        </div>
                    </div>
                </div>

                <label className="ml-2">Remember me</label>
                <div className="flex items-center mb-6">

                    <input type="checkbox" id="saveInfo" className="mr-2" />
                    <label htmlFor="saveInfo">Save my information for a faster checkout</label>
                </div>

                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-md"
                    onClick={placeOrder}
                >
                    Pay now
                </button>
            </div>


            {/* Right Section - Order Summary */}
            <div className="sticky top-10 bg-gray-50 p-6 rounded-lg shadow-md h-max">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="mb-6">
                    {cartItems.map((product, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-4">
                            <img
                                src={product.img}
                                alt={product.productName}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{product.productName}</h3>
                                <p className="text-gray-500">{product.color}</p>
                            </div>
                            <p className="font-semibold">${product.price}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                        <p>Subtotal</p>
                        <p>${amount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p>Shipping</p>
                        <p>${tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <p>Total</p>
                        <p>${(amount + tax).toFixed(2)}</p>
                    </div>
                </div>

                {/* <button
                    className="w-full bg-black text-white py-3 mt-6 rounded-md"
                    onClick={placeOrder}
                >
                    Place Order
                </button> */}
            </div>
        </div>
    );
};

export default Checkout;
