import React, { useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../context/AuthContext'
import { useRouter } from 'next/router';
import Link from 'next/link'


const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { signIn } = useContext(userContext)


    const signInNewUser = async (e: any) => {
        e.preventDefault()
        setError('')
    try {
        await signIn(email, password)
        alert('ntoiin')
    //   router.push('/')
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
      <button onClick={signInNewUser}>signIn</button>
      <p>{error}</p>
      <p>Already Registered? 
        <Link href='/sign_up'>Sign In</Link>
      </p>
    </div>
  )
}

export default SignIn