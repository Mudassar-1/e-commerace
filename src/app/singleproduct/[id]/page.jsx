"use client";
import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "@/context/CartProvider";
import { Toaster , toast } from "react-hot-toast";


const Page = ({ params }) => {
  const [activeImg, setActiveImg] = useState("");
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);

  const { addToCart, cartItems } = useContext(CartContext);

  const updateTotalPrice = () => {
    const newTotalPrice = product?.price * value;
    setTotalPrice(newTotalPrice);
  };

  const id = params.id;

  const settings = {
    dots: true,
    arrows:false,
    infinite: true,
    autoplay:true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    adaptiveHeight: true,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProduct(data.getSingle);
        setActiveImg(data.getSingle.images[0]);
        setTotalPrice(data.getSingle.price); // Set initial total price
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    updateTotalPrice();
  }, [value, product]);

  function createMarkup(desc) {
    return { __html: desc };
  }
  const handleAddToCart = () => {
    if(value < product.stock){
      addToCart(product, value);

    }
    toast.success(`${product.title} added to cart!`);
    setTimeout(() => {
    window.location.reload();
  },1000);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const cartItem = cartItems.find(item => item._id === product._id) || { quantity: 0 };

  return (
    <div className="container mx-auto p-4">
    <Toaster/>
      <div className="lg:flex md:flex mb-5 gap-4 globalShadow rounded-xl pb-2">
        <div className="md:w-4/12">
          <div className="flex flex-col items-center mt-7 mb-5 mx-5">
            <div className="flex justify-center object-contain p-6 border w-80 border-gray-30 mb-5 shadow-inner shadow-orange-400">
              <img
                src={activeImg}
                alt="Active item"
                className="w-full h-72 max-w-md object-contain "
              />
            </div>
            <div className="w-full max-w-md p-2 shadow-inner shadow-orange-300">
              <Slider {...settings}>
                {product.images.map((v, i) => (
                  <div key={i} className="p-1 w-20 h-20  object-cover">
                    <img
                      src={v}
                      className="w-16 h-20 p-3 border border-orange-300  rounded-md cursor-pointer"
                      alt={`Carousel item ${i}`}
                      onClick={() => setActiveImg(v)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="mt-20 flex-1">
          <div className="mb-8 border border-orange-200 rounded-xl shadow-xl inline-block px-3 bg-orange-200 text-orange-500 ml-5 ">{product?.category?.title}</div>
          <h1 className="text-center mb-5 font-extrabold text-gray-700 text-3xl">
            {product.title}
          </h1>
          <hr />
          <div
            className="text-justify mr-5 indent-10 tracking-wide ml-2 mt-7 line-clamp-4"
            dangerouslySetInnerHTML={createMarkup(product.desc)}
          />
          <div className=" md:flex justify-between mx-7 mt-20">
            <div className="mt-5 text-orange-400 text-xl">
              RS: {product.price}
            </div>
            <div className="mt-5 text-gray-700 font-bold">
              Stock: {product.stock}
            </div>
          </div>
          {/* Quantity */}
          <div className="flex items-center mt-10 ml-10">
            <div className="flex items-center mt-">
              <p className="text-orange-500 text-xl mr-4">Quantity:</p>
            </div>
            <div className="flex">
              <button 
                className="border border-solid rounded-full w-7 h-7 text-gray-700 bg-gray-100 hover:bg-gray-200"
                // disabled={value === 9}
                onClick={() => {
                  if (value < product.stock) {
                    setValue(value + 1);
                    updateTotalPrice();
                  }
                }}
              >
                +
              </button>
              <p className="mx-4 w-7 text-center">{value}</p>
              <button
                className="border border-solid rounded-full w-7 h-7 text-gray-700 bg-gray-100 hover:bg-gray-200"
                disabled={value === 1}
                onClick={() => {
                  if (value > 1) {
                    setValue(value - 1);
                    updateTotalPrice();
                  }
                }}
              >
                -
              </button> 
            </div>
          </div>
          <div className="mt-10 ml-10 flex gap-10">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* <button className="border px-6 sm:px-14 py-2 sm:py-4 font-bold text-white bg-orange-400 hover:bg-orange-500 w-full sm:w-auto">
                Buy Now
              </button> */}
              <button
                type="button"
                onClick={handleAddToCart}
                toast
                className="border px-6 sm:px-14 py-2 sm:py-4 font-bold text-white rounded-xl bg-orange-400 hover:bg-orange-500 w-full sm:w-auto"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="globalShadow rounded-xl p-5">
        <h2 className="text-2xl font-extrabold drop-shadow-lg mb-2">Describtion</h2><hr />
      <div
        className="text-justify md:mr-5 text-xs md:text-xl md:indent-10 tracking-wide md:mt-7"
        dangerouslySetInnerHTML={createMarkup(product.desc)}
      />
    </div>
      </div>
  );
};

export default Page;
