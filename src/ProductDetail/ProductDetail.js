import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import { FaShareAlt, FaTwitter, FaPinterest } from "react-icons/fa";
import "react-image-gallery/styles/css/image-gallery.css"; // Default styles for the gallery
import "../ProductDetail/ProductDetails.css"; // Custom CSS for the component
import "react-image-gallery/styles/css/image-gallery.css";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const productDetail = {
    title: "CECILIA TOP PINK PLAID",
    price: 265.0,
    description:
      "PINK PLAID CECILIA TOP\n\nNOTE FROM THE KOCH GIRLS: WE WILL BE PAIRING THIS CECILIA TOP WITH THE MATCHING SHELBY SKIRT OR WITH HIGH WAISTED PANTS",
    details: [
      "CROP TOP",
      "RUFFLE SLEEVES",
      "BACK CENTER ZIPPER",
      "PEACH WITH A SHINY FINISH",
      "100% POLYESTER",
      "DRY CLEAN",
      "MADE IN AMERICA",
    ],
    imageGallery: [
      {
        original: "https://shopkoch.com/cdn/shop/files/0K9A4654_900x.jpg?v=1723662427",
        thumbnail: "https://shopkoch.com/cdn/shop/files/0K9A4654_900x.jpg?v=1723662427",
        originalAlt: "Front view of Cecilia Top in Pink Plaid",
      },
      {
        original: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
        originalAlt: "Camera Body With XF18-55mm Lens – Black",
      },
      {
        original: "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail: "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
        originalAlt: "Camera Body With XF18-55mm Lens – Black",
      },
    ],
    sizeOptions: ["XS", "S", "M", "L", "XL"],
  };

  const recommendedProducts = [
    {
      title: "White Cozy Sweater",
      image: "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "White sweater product",
    },
    {
      title: "Black Shimmer Dress",
      image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Black dress product",
    },
    {
      title: "Summer Two-Piece Set",
      image: "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Two-piece outfit product",
    },
  ];

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increment" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  return (
    <>

      <div className="container mx-auto max-w-[1200px] py-10 grid lg:grid-cols-2 gap-10">
        {/* Left Section: Product Image */}
        <div className="mx-auto px-4">
          <ReactImageGallery
            items={productDetail.imageGallery}
            showBullets={true}
            showFullscreenButton={false} 
            showPlayButton={false} 
            showThumbnails={true}
            thumbnailPosition="bottom"
            additionalClass="custom-gallery" 
          />
        </div>

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <label>QUANTITY</label>
          <div className="quantity-controls">
            <button
              onClick={() => handleQuantityChange("decrement")}
              disabled={quantity === 1}
            >
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange("increment")}>
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart">
          <BiShoppingBag className="icon" /> ADD TO CART
        </button>

        {/* Product Description */}
        <p className="product-description">{productDetail.description}</p>

        {/* Product Details */}
        <div className="product-details">
          <label>DETAILS:</label>
          <ul>
            {productDetail.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <button>
            <FaShareAlt /> Share
          </button>
          <button>
            <FaTwitter /> Tweet
          </button>
          <button>
            <FaPinterest /> Pin it
          </button>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="recommended-products">
        <h2>You Might Also Love</h2>
        <div className="recommended-grid">
          {recommendedProducts.map((product, index) => (
            <div key={index} className="recommended-product">
              <img src={product.image} alt={product.alt} />
              <h3>{product.title}</h3>
              <p>${productDetail.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
