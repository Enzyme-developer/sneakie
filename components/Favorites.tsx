import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { userContext } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { urlFor } from '../LIB/client';
import { BiTrash, BiTrashAlt } from 'react-icons/bi'
import { AiOutlineArrowRight } from 'react-icons/ai';
import {InfinitySpin} from 'react-loader-spinner'

const Favorites = () => {
  const router = useRouter()
  const { user } = useContext(userContext)
  const [ favorites, setFavorites ] = useState<any>([])
  const [ loading, setLoading ] = useState(false)


  useEffect(() => {
    setLoading(true)
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setFavorites(doc.data()?.favoriteItems);
    });
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }, [user?.email]);


  
  const cartPath = doc(db, 'users', `${user?.email}`);

  // console.log(favorites)
    
      
  const handleDelete= async (passedid :any) => {
    try {
      const result = favorites.filter((item:any) => item.id != passedid);
      await updateDoc(cartPath, {
        favoriteItems: result,
      });
      toast.error(`item was removed from favorites`)
        
    } catch (e:any) {
      // console.log(e.message);
    }
  };

  
  if (loading) { return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight:'100vh' }}><InfinitySpin width='200' color="blue" /></div> }
    

  return (
    <div className='my__favorites'>
      <Toaster />
    <div className="favorite__items">
        {favorites?.length > 0 ? (
        favorites?.map((item: any) => (
        <div className='favorite__section'>
          <img  src={urlFor(item?.image[0])} width={150} height={150} className="feature__image" />
          <h2>{item?.name}</h2>
          <h4>Price : ${item?.price}</h4>
          <h4>Category : {item?.category}</h4>
          <Link href={`/product/${item?.slug}`}><AiOutlineArrowRight style={{cursor: 'pointer'}} /></Link>
          <button onClick={() => handleDelete(item?.id)} className='delete__favorite' style={{cursor:'pointer'}}><BiTrash style={{marginRight: '4px'}} />delete</button>
        </div>
        ))) : (<h1>No Item In Favorites</h1>)}
    </div>
     
    </div>
  )
}

export default Favorites
