import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
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
  const [nav, setNav] = useState<boolean>(false)
    

  //logout function
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


  //signIn redirect button
  const signin = () => {
    router.push('/sign_in')
  }


  //signUp redirect button
  const signup = () => {
    router.push('/sign_up')
  }


  //get username
  let nameMatch = user?.email?.match(/^([^@]*)@/);
  const name = nameMatch ? nameMatch[1] : null;


  //redirect to cart
  const goToCart = () => {
    router.push ('/cart')
  }


  //handle navigation 
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className="navbar">

      <div>
        <p className="navbar__logo">
          <Link href="/">Sneakie</Link>
        </p>
      </div>

      



      {!nav && <div className='navbar__buttons show'>
        {user ? (
          <button type='button' onClick={handlelogOut} className='navbar__buttons__logout'>logout</button>
        ) : (
          <>
            <button type='button' onClick={signup} className='navbar__buttons__signup'>Sign Up</button>
            <button type='button' onClick={signin} className='navbar__buttons__signin'>Sign In</button>
          </>
        )}
      </div>
      }


      <div className="toggle">
        {nav && <div className='navbar__buttons'>
          {user ? (
            <button type='button' onClick={handlelogOut} className='navbar__buttons__logout'>logout</button>
          ) : (
            <>
              <button type='button' onClick={signup} className='navbar__buttons__signup'>Sign Up</button>
              <button type='button' onClick={signin} className='navbar__buttons__signin'>Sign In</button>
            </>
          )}
        </div>
        }
      </div>


      

        

      
      <div className="navbar__user">
        <div className='navbar__username'>
          {!user ? ('') :
            (<p>Hi, {name}</p>)
          }
        </div>
        
        <button type="button" className="navbar__cart" onClick={goToCart}>
          <AiOutlineShopping /><span className="navbar__cart__qty">{cartItems.length}</span>
        </button>
      </div>

      <div onClick={handleNav}><p>vhjdjd</p></div>
     
    </div>
  )
}

export default Navbar