import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';
import { userContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const router = useRouter()

  //get functions from the context
  const { showCart, setShowCart, totalQuantities, cartItems, storage } = useStateContext();
  const { logOut, user } = useContext(userContext)
  //state for responsive navbar
  const [nav , handleNav ] = useState(false)
  const [quantity , setQuantity ] = useState(0)
    
  const handlelogOut = async (e : any) => {
    try {
      await logOut()
      router.push('/')
      toast.error('logout successful')
    }
    catch (e: any){
      console.log(e)
    }
  }

  const signin = () => {
    router.push('/sign_in')
  }

  const signup = () => {
    router.push('/sign_up')
  }

  let nameMatch = user?.email?.match(/^([^@]*)@/);
  const name = nameMatch ? nameMatch[1] : null;
  // console.log(nameMatch)
  // console.log(user)

  const goToCart = () => {
    router.push ('/cart')
  }


  return (
    <div className="navbar-container">
      <div>
        <p className="logo">
          <Link href="/">Sneakie</Link>
        </p>
      </div>

      <div>
        {!user ? ('') :
          (<p>Hi, {name}</p>)
        }
      </div>

      <button onClick={handlelogOut}>logout</button>

      <div className='buttons'>
        <button type='button' onClick={signup} className='sign-up'>Sign Up</button>
        <button type='button' onClick={signin} className='sign-in'>Sign In</button>
        <button type='button' className='sign-out'>Logout</button>
      </div>

      <button type="button" className="cart-icon" onClick={goToCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{cartItems.length}</span>
      </button>

      {/* {showCart && <Cart />} */}
    </div>
  )
}

export default Navbar