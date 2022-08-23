import { useState , useEffect , createContext } from 'react'
import { auth , db } from '../firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged, UserCredential, getAuth } from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast';


type AuthContextType = {
    // signUp: (email: any, password: any) => Promise<void>
    signUp: (email: any, password: any) => void
    signIn: (email: any, password: any) => Promise<UserCredential>
    logOut: () => Promise<void>
    user: any
}



export const userContext = createContext<AuthContextType>({} as AuthContextType)



export const AuthContextProvider = ({ children }: any) => {
    
    const [user, setUser] = useState({})
    console.log(user)
    
    // const signUp = (email: any, password: any) => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //     return setDoc(doc(db, 'users', email), {
    //         favoriteItems: [],
    //     })
    // }

    const signUp = (email: any, password: any) => {
        const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }


    const signIn = (email: any, password: any) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
        toast.error('logout successful')
    }
 

    //check if user is authenticated after signing in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)

            //cleanup function
            return () => {
                unsubscribe()
            }
        })
    }, [])


    return (
        <userContext.Provider value={{ signUp, signIn, logOut, user }} >
            {children}
        </userContext.Provider>
    )
};