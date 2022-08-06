import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth , db } from '../firebase';


const signUp = (email: any, password: any) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
}


const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  return (
    <div>
          <input onChange={(e) => setEmail(e.target.value)} />
          <input onChange={(e) => setPassword(e.target.value)} />
          <button onClick={() => signUp(email, password)}>signup</button>

    </div>
  )
}

export default Signup