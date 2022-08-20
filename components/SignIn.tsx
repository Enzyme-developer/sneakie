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
      <div className="register">
      <h1 className='checkout__text'>Sign In</h1>
      <label>Email address</label>
      <input onChange={(e) => setEmail(e.target.value)} placeholder='john@gmail.com' />
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='12regdj'/>
      <button className='signin' onClick={signInNewUser}>signIn</button>
      <p className='error'>{error}</p>
      <p className='correct'>Not Registered? 
      <Link href='/sign_up'><p style={{textDecoration: 'underline' , color: '#270a4b'}}>Sign up</p></Link>
      </p>
    </div>
    </div>
  )
}

export default SignIn