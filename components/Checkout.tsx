import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import emailjs from 'emailjs-com'
import { userContext } from '../context/AuthContext';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../LIB/client';

const Checkout = () => {

const router = useRouter();
const [address, setAddress] = useState('')
const [telephone, setTelephone] = useState('')
const [edd, setEdd] = useState('')
const [payment, setPayment] = useState('')
const [loading, setLoading] = useState(false)
const { user } = useContext(userContext)
const { setCartItems, cartItems, totalPrice } = useStateContext()
    
    
const confirm = () => {
    if (address && telephone) {
        toast.success('Order placed successfully, We would be in touch')
        router.push('/')
        setCartItems([])
    } else {
        alert('fill all fields to validate checkout')
    }
} 
    
    
    useEffect(() => {
        const someDate = new Date();
        let result = new Date(someDate.setDate(someDate.getDate() + Math.floor(Math.random() * 5))).toString().substring(0, 15);
        setEdd(result)
    }, [])
    



    if (!user) {
        router.push('/')
    }

    return (
       
        <div className='checkout'>
        <Toaster />
        
            <div className='checkout__info'>
            <h1 className='checkout__text'>Checkout</h1>
            <div className="checkout__items">
                {cartItems?.map((item: any) => (
                    <div className="item">
                        <img  src={urlFor(item?.image[0])} style={{width: '50px' , height: '50px', borderRadius:'10px'}} />
                        <p>{item?.name}</p>
                        <p>${item?.price}</p>
                    </div>
                ))}
            </div>
            <label>Address</label>
            <input className='checkout__input' type='text' placeholder='address' required onChange={(e) => setAddress(e.target.value)} />
            <label>Phone Number</label>
            <input className='checkout__input' type={'tel'} placeholder='telephone Number' required onChange={(e) => setTelephone(e.target.value)} />
            
            
            <label>Payment Method</label>
            <select onChange={(e) => setPayment(e.target.value)}>
                <option value='cash'>Cash</option>
                <option value='card'>Debit card</option>
            </select>

            
            
            {payment == 'card' && <div className='checkout__card'>
                <label>Card Number</label>
                <input className='checkout__input' defaultValue='5567 8198 6654 4352' />
                <label>CVV</label>
                <input className='checkout__input' defaultValue='652' />
            </div>}
            
            
            <p className='edd'>Total : ${totalPrice}</p>
            <p className='edd'>Expexcted delivery date : {edd}</p>

            <button className='checkout__button' onClick={confirm}>Confirm Checkout</button>

        </div>
        
    </div>
  )
}

export default Checkout