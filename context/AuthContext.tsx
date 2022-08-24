import { useState , useEffect , createContext } from 'react'
import { auth , db } from '../firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged, UserCredential } from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast';


type AuthContextType = {
    signUp: (email: any, password: any) => Promise<void>
    signIn: (email: any, password: any) => Promise<UserCredential>
    logOut: () => Promise<void>
    user: any
}



export const userContext = createContext<AuthContextType>({} as AuthContextType)


export const AuthContextProvider = ({ children }: any) => {
    
    const [user, setUser] = useState({})
    console.log(user)
    
    const signUp = async (email: any, password: any) => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    let user = userCredential.user;
    console.log(user)
    })
    
    return setDoc(doc(db, 'users', email), {
        favoriteItems: [],
    })
    }


    const signIn = (email: any, password: any) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
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