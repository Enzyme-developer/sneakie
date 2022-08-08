import React, { useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../context/AuthContext'
import { useRouter } from 'next/router';
import Link from 'next/link'


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { signUp } = useContext(userContext)


  const signNewUser = async (e : any) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password)
      // router.push('/cart')
      alert('bjhbcjhnd')
    }
    catch (e: any){
      console.log(e)
      setError(e.message)
    }
  }
  

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input onChange={(e) => setPassword(e.target.value)} />
      <button onClick={ signNewUser }>signup</button>
      <p>{error}</p>
      <p>Already Registered? 
        <Link href='/sign_in'>Sign In</Link>
      </p>
    </div>
  )
}

export default Signup