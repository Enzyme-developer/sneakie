import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { userContext } from '../context/AuthContext';

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
        
    } catch (e:any) {
      console.log(e.message);
    }
  };

    
  return (
    <div>
        {favorites?.map((item: any) => (
            <div>
                <h1>{item.name}</h1>
                <button onClick={() => handleDelete(item.id)}>delete</button>
            </div>
        ))}
    </div>
  )
}

export default Favorites