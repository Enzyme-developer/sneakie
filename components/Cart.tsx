import React, { useRef, useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { Toaster } from 'react-hot-toast';


import { useStateContext } from '../context/StateContext';
import { urlFor } from '../LIB/client';
import { userContext } from '../context/AuthContext';
import { useRouter } from 'next/router';


const Cart = () => {
  const router = useRouter()
  const cartRef = useRef();
  const [cart, setCart] = useState([]);
  const { user } = useContext(userContext);
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, onAdd } = useStateContext();

  console.log(cartItems)


  return ( 

    <div className="cart-wrapper">
      <Toaster />
      <div className="cart-container">
          
          <div className='cart'>
              <div className="cart-heading">
              <span className="heading">Your Cart</span>
              <span className="cart-num-items">({cartItems.length} items)</span>
            </div>



        {/* cart is empty */}
        {cartItems?.length < 1 && (
          <div className="empty-cart">
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" className="btn" >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        
        {/* cart is not empty */}
        <div className="product-container">
          {cartItems?.length >= 1 && cartItems.map((item: any) => (

            <div className="product" key={item?._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">

                <div className="flex top">
                  <h4>{item?.name}</h4>
                  <h4>${item?.price}</h4>
                  <p className="cart-quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuanitity(item?._id, 'dec') }><AiOutlineMinus /></span>
                      <span className="num" >{item?.quantity}</span>
                      <span className="plus" onClick={() => toggleCartItemQuanitity(item?._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                </div>

                
                <div className="flex bottom">
                  <button type="button" className="remove-item" onClick={() => onRemove(item)} >
                    <TiDeleteOutline />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>


        
        {cartItems?.length >= 1 && (
          <div className="cart-bottom">

            <div className="total">
              <h3>Subtotal: ${totalPrice}</h3>
            </div>

            
            <div className="btn-container">
              <Link href='/checkout'>
                <p>Proceed to checkout <AiOutlineCheck /></p>
              </Link>
            </div>
            
          </div>
        )}
        </div>
       
      </div>
      
    </div>
  )
}

export default Cart