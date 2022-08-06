import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  //get functions from the context
  const { showCart, setShowCart, totalQuantities, cartItems } = useStateContext();
  //state for responsive navbar
  const [nav , handleNav ] = useState(false)
  const [quantity , setQuantity ] = useState(0)

  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);  
    

  useEffect(()=>{
    let prev_items = JSON.parse(localStorage.getItem('cartItems')!);
    // setIsInitiallyFetched(true)
    setQuantity(prev_items?.length)
  }, [cartItems])
  

  return (
    <div className="navbar-container">
      <div>
        <p className="logo">
          <Link href="/">Sneakie</Link>
        </p>
      </div>

      <div className='buttons'>
        <button type='button' className='sign-up'>Sign Up</button>
        <button type='button' className='sign-in'>Sign In</button>
        <button type='button' className='sign-out'>Sign Out</button>
      </div>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{quantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar