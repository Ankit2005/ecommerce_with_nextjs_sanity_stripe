import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { cartItems, totalPrice, totalQuantities, setShowCart, showCart, qty } =
    useStateContext();
  console.log("totalQuantities ---> ", totalQuantities);
  console.log("cartItems cart ---> ", cartItems);
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Boat Headphones</Link>
      </p>

      <button
        type="button"
        onClick={() => setShowCart(!showCart)}
        className="cart-icon"
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
