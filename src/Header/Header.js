import "./Header.css";
import { FaShoppingCart, FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const count = useSelector((state) => state.itemCart?.count);
  const navigate = useNavigate();
  const navigateToCart = () => navigate("/cart");

  return (
    <div className="header">
      <div className="social-icons">
        <IconContext.Provider value={{ className: "reactIcons" }}>
          <FaInstagram />
          <FaPinterest />
          <FaFacebook />
        </IconContext.Provider>
      </div>
      <img
        src="https://shopkoch.com/cdn/shop/files/KOCH-blue_2x_d820dd49-8a98-47ea-88ae-f7c767d4f921_540x.png?v=1613723722"
        alt="Koch Logo"
        className="logo"
      />
      <div className="right-icons">
        <IconContext.Provider value={{ className: "reactIcons" }}>
          <div className="shoppingCart" onClick={() => navigateToCart()}>
            <FaShoppingCart />
            <span className="count">({count})</span>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Header;
