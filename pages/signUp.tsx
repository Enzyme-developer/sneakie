import React, { useState, useContext } from 'react';
import Link from 'next/link'
import { userContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useContext(userContext);
  

  //handle signup
    const handleSubmit = async (e: any) => {
    const router = useRouter()
    e.preventDefault()
    setError('')
    try {
      await signUp(email,password)
        router.push('/')
        console.log('success')
    } catch (e : any) {
      setError(e.message)
      console.log(e.message)
    }
  }



  return (
    <div>
      <div>
        
        <h1>Sign Up</h1>
        {error ? <p>{error}</p> : null}
        
        <form onSubmit={handleSubmit}>
            
          <div className='my-4'>
            <label>Email</label>
           
            <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            />
        
          </div>
                  
          <div className='my-4'>
            <label>Password</label>
           
            <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            />
       
          </div>

                  
          <button >Sign up</button>
                  
        </form>

        <p className='my-4 text-center'>Already have an account?{' '}
          <Link href='/signin'>
            Sign in
          </Link>
        </p>


        <p> {error} </p>
        
      </div>
    </div>
  );
};

export default SignUp;