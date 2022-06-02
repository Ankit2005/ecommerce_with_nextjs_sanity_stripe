import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(0);

  const onAdd = (product, quantity) => {
    const isProductAllreadyInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (isProductAllreadyInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
    setQty(0);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  let foundProduct = null;
  let index = null;

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item, i) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    //const newIem = cartItems.filter((item) => item._id !== id);
    const cartItemsCopy = [...cartItems];

    if (value === "inc") {
      cartItemsCopy &&
        cartItemsCopy.splice(index, 1, {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        });
      setCartItems(cartItemsCopy);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        cartItemsCopy &&
          cartItemsCopy.splice(index, 1, {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          });
        setCartItems(cartItemsCopy);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const removeItem = (removebleItem) => {
    const newCartItems = cartItems.filter(
      (item) => item._id !== removebleItem._id
    );
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - removebleItem.price * removebleItem.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - removebleItem.quantity
    );
    setCartItems(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        setQty,
        onAdd,
        removeItem,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
