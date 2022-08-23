import Link from 'next/link';
import { useContext, useState } from 'react';
import { userContext } from '../context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useStateContext } from '../context/StateContext';
//for fetching images
import { urlFor } from '../LIB/client';
import { db } from '../firebase';
import toast from 'react-hot-toast';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { BsCart4 } from 'react-icons/bs';

const IndividualProduct = ({ product }: any) => {

  const { onAdd, qty } = useStateContext();
  const [save, setSave] = useState(false)
  const { user } = useContext(userContext)

  //save coin for each user in different paths
  const itemPath = doc(db, 'users', `${user?.email}`);

  const saveItem = async () => {
    if (user) {
      setSave(true);
      await updateDoc(itemPath, {
        favoriteItems: arrayUnion({
          id: product._id,
          name: product.name,
          price: product.price, 
          category: product.category,
          details: product.details,
          slug: product.slug.current,
          image: product.image,
        }),

      });
      toast.success('Item added to favorites');

    } else {
      toast.error('Please sign in to add items to favorites');
    }
  };


  return (
    <div>
      {/* go to clicked product by using slug.current */}
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(product.image && product.image[0])}
            width={280}
            height={280}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>

        </div>
      </Link>

      <div className="index__buttons" style={{ display: 'flex', alignItems: "center", gap: '20px' }}>
        <button className='favorite' onClick={() => saveItem()}><MdOutlineFavoriteBorder className='favorite__button' /> favorite</button>
        <button onClick={() => onAdd(product, 1)} className='index__add'><BsCart4 style={{marginRight: '5px'}} />Add to cart</button>
      </div>

    </div>
  )
}

export default IndividualProduct