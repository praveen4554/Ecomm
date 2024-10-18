import './Header.css';
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";



function Header() {
  const count = useSelector((state) => state.itemCart?.count);
  const navigate = useNavigate(); 
  const navigateToCart = () => navigate('/cart');
  return (
      <div className="shoppingCart" onClick={() => navigateToCart()}>
      <span className="count"> ( {count} ) </span>
      <IconContext.Provider value={{ className : "reactIcons"}}>
     <FaShoppingCart /> 
     </IconContext.Provider>
     </div>
  );
}

export default Header;
