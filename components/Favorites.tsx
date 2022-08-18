import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { userContext } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { urlFor } from '../LIB/client';

const Favorites = () => {
  const router = useRouter()
  const { user } = useContext(userContext)
  const [ favorites, setFavorites ] = useState<any>([])


  const navigateToPage = () => {
    router.push(``)
  }

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
        <div onClick={navigateToPage}>
          <Link href={`/product/${item.slug}`}>
            <div className="image">
              <img 
              src={urlFor(item.image && item.image[0])}
              width={280}
              height={280}
              className=""
              />
            </div>
            <div>
              <h1>{item.name}</h1>
              <h3>${item.price}</h3>
              <h3>${item.category}</h3>
            </div>
          </Link>
          <button onClick={() => handleDelete(item.id)}>delete</button>
        </div>
        ))}
    </div>
  )
}



export default Favorites