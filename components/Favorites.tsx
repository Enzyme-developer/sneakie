import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { userContext } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

const Favorites = () => {
  const { user } = useContext(userContext)
  const [ favorites, setFavorites ] = useState<any>([])


  useEffect(() => {
  onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setFavorites(doc.data()?.favoriteItems);
  });
  }, [user?.email]);


  
  const cartPath = doc(db, 'users', `${user?.email}`);

  console.log(favorites)
    
      
  const handleDelete= async (passedid :any) => {
    try {
      const result = favorites.filter((item:any) => item.id != passedid);
      await updateDoc(cartPath, {
        favoriteItems: result,
      });
      toast.error(`item was removed from favorites`)
        
    } catch (e:any) {
      console.log(e.message);
    }
  };

  
    
  return (
    <div>
      <Toaster />
      {favorites?.map((item: any) => (
        <Link  href={`/`}>
          <div>
            <h1>{item.name}</h1>
            <h3>${item.price}</h3>
            <button onClick={() => handleDelete(item.id)}>delete</button>
          </div>
        </Link>
        ))}
    </div>
  )
}



export default Favorites