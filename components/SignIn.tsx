import React, { useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../context/AuthContext'
import { useRouter } from 'next/router';
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import {InfinitySpin} from 'react-loader-spinner'



const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { signIn, user } = useContext(userContext)


  const signInNewUser = async (e: any) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      await signIn(email, password)
      router.push('/')
      toast.success('sign in successful')
      setTimeout(() => {
        setLoading(false)
      }, 4000);
    }
    catch (e: any){
      // console.log(e)
      setLoading(false)
      setError(e.message.slice(10, e.length))
    }
  }
  
  if (loading) {return <div style={{minHeight:'100vh', display: 'flex', justifyContent:'center', alignItems: 'center'}}><InfinitySpin width='200'color="blue" /></div>}

  return (
  
    <div className='register-div'>
      <Toaster />
      <div className="register">
      <h1 className='checkout__text'>Sign In</h1>
      <form onSubmit={signInNewUser}>
      <label>Email address</label>
      <input onChange={(e) => setEmail(e.target.value)} placeholder='john@gmail.com' type='email' required />
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type='password' required placeholder='12regdj'/>
      <button className='signin'type='submit'>signIn</button>
      </form>
      <p className='error'>{error}</p>
      <p className='correct'>Not Registered? 
      <Link href='/sign_up'><p style={{textDecoration: 'underline' , color: '#270a4b'}}>Sign up</p></Link>
      </p>
     </div>
    </div>
  )
}

export default SignIn