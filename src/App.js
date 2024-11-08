import logo from './logo.svg';
import './App.css';
import ProductList from "./Products/ProductList";
import ProductDetail from './ProductDetail/ProductDetail';
import Cart from './Cart/Cart';
import { FaShoppingCart } from "react-icons/fa";
import {IconContext} from "react-icons";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Checkout from './Checkout/Checkout';
import OrderList from './Order/OrderList';
import Header from './Header/Header';
import Home from './Home';
import Contact from './Contact/ContactUs';
import LoginPage from './Login/LoginPage';
import Register from './Rigester/Register';


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Placeholder for child routes */}
    </>
  );
};


function App() {
  const count = useSelector((state) => state.itemCart?.count);
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />, 
    children: [
    { path:'/',element:<Home />},
    { path: "/productDetails", element: <ProductDetail /> },
    { path: "/cart", element: <Cart /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/order", element: <OrderList /> },
    { path: "/contact-us", element: <Contact /> },
    { path: "/login-page", element: <LoginPage /> },
    { path: "/signup", element: <Register /> },



  ]
  }
  ]);
  return (
    <div className="main">
     <RouterProvider router={router} />
  </div>
  );
}

export default App;
