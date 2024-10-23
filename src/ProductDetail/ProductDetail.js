import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import { FaShareAlt, FaTwitter, FaPinterest } from "react-icons/fa";
import "react-image-gallery/styles/css/image-gallery.css";

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
      {/* CSS Styling for Fixed Image Sizes */}
      <style jsx>{`
        /* Main Image Container */
        .custom-gallery .image-gallery-slide img {
          width: 500px;
          height: 500px;
          object-fit: contain; /* Ensure the whole image fits without cropping */
          max-width: 100%; /* Ensure responsiveness */
          margin: 0 auto; /* Center the image */
          background-color: #f0f0f0; /* Optional: Add background color for letterbox effect */
        }

        /* Thumbnail Container */
        .custom-gallery .image-gallery-thumbnail {
          width: 80px;
          height: 80px;          overflow: hidden;
          border-radius: 5px;
          margin: 5px; /* Add spacing between thumbnails */
        }

        .custom-gallery .image-gallery-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Prevent thumbnail cropping */
        }

        .custom-gallery .image-gallery-fullscreen-button {
          display: none; /* Hide fullscreen button if not needed */
        }
      `}</style>

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

        {/* Right Section: Product Details */}
        <div className="container mx-auto max-w-[600px] py-10 px-5 text-blue-700">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            {productDetail.title}
          </h1>
          <p className="text-2xl text-blue-700 mb-5">
            ${productDetail.price.toFixed(2)}
          </p>

          {/* Size Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">
              SIZE
            </label>
            <select
              className="border px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-700"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {productDetail.sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">
              QUANTITY
            </label>
            <div className="flex items-center gap-2">
              <button
                className="border px-3 py-1 rounded-md text-blue-700"
                onClick={() => handleQuantityChange("decrement")}
                disabled={quantity === 1}
              >
                −
              </button>
              <span className="text-lg text-blue-700">{quantity}</span>
              <button
                className="border px-3 py-1 rounded-md text-blue-700"
                onClick={() => handleQuantityChange("increment")}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-blue-700 text-white py-3 rounded-md text-sm font-medium mt-4 mb-8">
            <BiShoppingBag className="inline mr-2" />
            ADD TO CART
          </button>

          {/* Product Description */}
          <p className="text-sm text-blue-700 mb-6 whitespace-pre-line">
            {productDetail.description}
          </p>

          {/* Product Details */}
          <label className="block text-sm font-medium text-blue-700 mb-1">
            DETAILS:
          </label>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1 mb-6 ml-7">
            {productDetail.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-blue-600">
              <FaShareAlt className="mr-2" /> Share
            </button>
            <button className="flex items-center text-blue-600">
              <FaTwitter className="mr-2" /> Tweet
            </button>
            <button className="flex items-center text-blue-600">
              <FaPinterest className="mr-2" /> Pin it
            </button>
          </div>
        </div>
         {/* Recommended Products Section */}
      <div className="col-span-2 mt-10">
        <h2 className="text-center text-blue-500 text-2xl font-semibold mb-5">You Might Also Love</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendedProducts.map((product, index) => (
            <div key={index} className="border p-4 rounded-md">
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-64 object-cover mb-3 rounded-md"
              />
              <h3 className="text-lg font-medium">{product.title}</h3>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default ProductDetail;
