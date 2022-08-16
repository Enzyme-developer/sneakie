import React, { useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../context/AuthContext'
import { useRouter } from 'next/router';
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';


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
      router.push('/')
      toast.success('signup successful')
    }
    catch (e: any){
      console.log(e)
      setError(e.message)
    }
  }
  

  return (
    <div>
      <Toaster />
      <label>Email address</label>
      <input onChange={(e) => setEmail(e.target.value)} placeholder='john@gmail.com'/>
      <input onChange={(e) => setPassword(e.target.value)} placeholder='jbvnfj2' type={password} />
      <label>Password</label>
      <button onClick={ signNewUser }>signup</button>
      <p>{error}</p>
      <p>Already Registered? 
        <Link href='/sign_in'>Sign In</Link>
      </p>
    </div>
  )
}

export default Signup