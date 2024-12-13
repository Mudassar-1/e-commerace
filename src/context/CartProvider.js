"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();




const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem, quantity) => {
    let cartCopy = [...cartItems];
    const alreadyExistedItem = cartCopy.find(
      (checkItem) => checkItem._id === newItem._id
    );
  
    if (alreadyExistedItem) {
      cartCopy = cartCopy.map((checkItem) => {
        if (checkItem._id === newItem._id) {
          const newQuantity = checkItem.quantity + quantity;
          if (newQuantity <= newItem.stock) { // Assuming newItem contains the stock information
            return {
              ...checkItem,
              quantity: newQuantity,
              totalPrice: newQuantity * checkItem.price,
            };
          } else {
            console.warn("Quantity exceeds stock available");
            return checkItem;
          }
        } else {
          return checkItem;
        }
      });
    } else {
      if (quantity <= newItem.stock) {
        cartCopy.push({
          ...newItem,
          quantity: quantity,
          totalPrice: newItem.price * quantity,
        });
      } else {
        console.warn("Quantity exceeds stock available");
      }
    }
  
    localStorage.setItem("cartItems", JSON.stringify(cartCopy));
    setCartItems(cartCopy);
  };
  
  

  const decreaseItemQuantity = (ItemToRemove) => {
    var copyItem = [...cartItems];

    const IsItemCheckInCart = cartItems.find(
      (cartItem) => cartItem._id === ItemToRemove._id
    );

    if (IsItemCheckInCart.quantity === 1) {
      copyItem = cartItems.filter(
        (cartItem) => cartItem._id !== ItemToRemove._id
      );
    } else {
      copyItem = cartItems.map((cartItem) =>
        cartItem._id === ItemToRemove._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              totalPrice: cartItem.totalPrice - cartItem.price,
            }
          : cartItem
      );
    }

    localStorage.setItem("cartItems", JSON.stringify(copyItem));
    setCartItems(copyItem);
};



  const RemoveSpecificItemFromCart = (_id) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    var copyCart = [];

    localStorage.setItem("cartItems", JSON.stringify(copyCart));

    setCartItems(copyCart);
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        clearCart,
        decreaseItemQuantity,
        RemoveSpecificItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;