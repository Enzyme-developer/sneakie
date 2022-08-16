import React, { useRef, useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast, { Toaster } from 'react-hot-toast';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../LIB/client';
import { userContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
// import getStripe from '../lib/getStripe';

const Cart = () => {
  const router = useRouter()
  const cartRef = useRef();
  const [cart, setCart] = useState([]);
  const { user } = useContext(userContext);
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, onAdd } = useStateContext();

  console.log(cartItems)


  return ( 

    <div className="cart-wrapper">
      <div className="cart-container">

        {!user ?
          (<div>
            <p>sign in to view cart</p>
            <Link href='/sign_in' >Sign In</Link>
          </div>) :
      
          
          (<div>
             <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({cartItems.length} items)</span>
        </button>

        <Toaster />


        {/* cart is empty */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" onClick={() => setShowCart(false)} className="btn" >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        
        {/* cart is not empty */}
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item: any) => (

            <div className="product" key={item?._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">

                <div className="flex top">
                  <h5>{item?.name}</h5>
                  <h4>${item?.price}</h4>
                </div>

                
                <div className="flex bottom">

               
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuanitity(item?._id, 'dec') }><AiOutlineMinus /></span>
                      <span className="num" >{item?.quantity}</span>
                      <span className="plus" onClick={() => toggleCartItemQuanitity(item?._id, 'inc') }><AiOutlinePlus /></span>
                    </p>
               

                  <button type="button" className="remove-item" onClick={() => onRemove(item)} >
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
              <Link href='/checkout' className="btn">
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
          </div>)}
       
      </div>

      {/* <div>
        {cartItems.map((cartItem) => (
          <h1>{cartItem?.name}</h1>
        ))}
        <h1>{totalPrice}</h1>
      </div> */}
    </div>
  )
}

export default Cart