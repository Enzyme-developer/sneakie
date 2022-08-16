import React, { useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../context/AuthContext'
import { useRouter } from 'next/router';
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';


const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { signIn } = useContext(userContext)


  const signInNewUser = async (e: any) => {
    setError('')
    try {
        await signIn(email, password)
      router.push('/')
      toast.success('sign in successful')
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
      <input onChange={(e) => setEmail(e.target.value)} placeholder='john@gmail.com' />
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='12regdj'/>
      <button onClick={signInNewUser}>signIn</button>
      <p>{error}</p>
      <p>Already Registered? 
        <Link href='/sign_up'>Sign In</Link>
      </p>
    </div>
  )
}

export default SignIn