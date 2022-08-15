import React, { useRef, useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../LIB/client';
import { userContext } from '../context/AuthContext';
// import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const [cart, setCart] = useState([]);
  const { user } = useContext(userContext);
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, onAdd } = useStateContext();


  console.log(cartItems)
  console.log(cartItems)


  // useEffect(() => {
  //   // if (cartItems !== initialState) {
  //     localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);


  // useEffect(() => {
  //   const cartData = JSON.parse(localStorage.getItem("cartItems"));
  //   if (cartData) {
  //     setCartItems(cartData);
  //   }
  // }, []);








  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cart.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cart.length >= 1 && cart.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" >{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn">
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        {cartItems.map((cartItem) => (
          <h1>{cartItem?.name}</h1>
        ))}
        <h1>{totalPrice}</h1>
      </div>
      
    </div>


  )
}

export default Cart