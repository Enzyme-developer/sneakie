import { useRouter } from 'next/router';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import emailjs from 'emailjs-com'

const Checkout = () => {

const router = useRouter();
const [address, setAddress] = useState('')
const [telephone, setTelephone] = useState('')
const [payment, setPayment] = useState('')
const [loading, setLoading] = useState(false)
    
    
const confirm = () => {
    if (payment && address && telephone) {
        setLoading(true)
        toast.success('Order placed successfully, We would be in touch.')
        router.push('/')
        setLoading(false)
    } else {
        alert('fill all fields to validate checkout')
    }
} 
    
    
const someDate = new Date();
let numberOfDaysToAdd = 2;
let result = new Date(someDate.setDate(someDate.getDate() + numberOfDaysToAdd)).toString().substring(0, 15);


    return (
       
        <div>
        {loading ? ( <h1>Processing your</h1>) : (
        <div>
        <Toaster />
        <input type='text' placeholder='address' required onChange={(e) => setAddress(e.target.value)}/>
        <input type={'tel'} placeholder='telephone Number' required onChange={(e) => setTelephone(e.target.value)} />
        
          
        <label>Payment Method</label>
        <select name="" id="" onChange={(e) => setPayment(e.target.value)}>
            <option value='cash'>Cash</option>
            <option value='card'>Debit card</option>
        </select>

          
          
        {payment == 'card' && <div>
            <label>Card Number</label>
            <input defaultValue='5567 8198 6654 4352' />
            <label>CVV</label>
            <input defaultValue='652' />
        </div>}
        
          
        <p>Expexcted delivery date : {result}</p>

          <button onClick={confirm}>Confirm Checkout</button>

            </div>
        ) }
        
    </div>
  )
}

export default Checkout