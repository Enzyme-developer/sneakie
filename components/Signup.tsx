import React, { useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../context/AuthContext'
import { useRouter } from 'next/router';
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import { InfinitySpin } from 'react-loader-spinner'
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged, UserCredential } from 'firebase/auth';
import { auth } from '../firebase';


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp, user } = useContext(userContext)


  const signNewUser = async (e : any) => {
    e.preventDefault()
    setError('')

    // try {
    //   setLoading(true)
    //   await signUp(email, password)
    //   router.push('/sign_in')
    //   toast.success('sign in successful')
    //   setLoading(false)
    // } catch (err: any) {
    //   console.log(err)
    //   setError(err.message)
    // }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       setLoading(true)
      // Signed in 
      router.push('/sign_in')
      toast.success('sign in successful')
      setTimeout(() => {
        setLoading(false)
      }, 4000);
      let user = userCredential.user;
      console.log(user)
    })
    .catch((error) => {
      setError(error.message.slice(10, error.length))
      var errorMessage = error.message
      console.log(errorMessage)
    
    });
    
  }
  

  if (loading) {return <div style={{minHeight:'100vh', display: 'flex', justifyContent:'center', alignItems: 'center'}}><InfinitySpin width='200'color="blue" /></div>}
  
  return (
    <div>
      <Toaster />
      <div className="register">
        <h1 className='checkout__text'>Sign Up</h1>
        <form onSubmit={signNewUser}>
        <label>Email address</label>
        <input onChange={(e) => setEmail(e.target.value)} placeholder='john@gmail.com' type='email' required />
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} placeholder='jbvnfj2' type="password" required />
        <button className='signup' type='submit'>signup</button>
        </form>
        <p className='error'>{error}</p>
        <p className='correct'>Already Registered? 
          <Link className='link' href='/sign_in'><p style={{textDecoration: 'underline' , color: '#270a4b'}}>Sign In</p></Link>
        </p>
      </div>
    </div>
  )
}

export default Signup