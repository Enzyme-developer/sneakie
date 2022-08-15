import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';
import { userContext } from '../context/AuthContext';

const Navbar = () => {
  const router = useRouter()

  //get functions from the context
  const { showCart, setShowCart, totalQuantities, cartItems, storage } = useStateContext();
  const { logOut } = useContext(userContext)
  //state for responsive navbar
  const [nav , handleNav ] = useState(false)
  const [quantity , setQuantity ] = useState(0)

  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);  
    

  const signin = () => {
    router.push('/sign_in')
  }

  const signup = () => {
    router.push('/sign_up')
  }

  console.log(storage)
  
  // useEffect(() => {
  //   if(isInitiallyFetched){
  //     localStorage.setItem("cart", JSON.stringify(cartItems));
  //     // total();
  //   }
  // }, [cartItems]);

  

  return (
    <div className="navbar-container">
      <div>
        <p className="logo">
          <Link href="/">Sneakie</Link>
        </p>
      </div>

      <button onClick={logOut}>logout</button>

      <div className='buttons'>
        <button type='button' onClick={signup} className='sign-up'>Sign Up</button>
        <button type='button' onClick={signin} className='sign-in'>Sign In</button>
        <button type='button' className='sign-out'>Logout</button>
      </div>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{storage.length}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar