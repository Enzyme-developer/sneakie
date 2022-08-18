import Link from 'next/link';
import { useContext, useState } from 'react';
import { userContext } from '../context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useStateContext } from '../context/StateContext';
//for fetching images
import { urlFor } from '../LIB/client';
import { db } from '../firebase';
import toast from 'react-hot-toast';

const IndividualProduct = ({ product }: any) => {
  const { onAdd, qty } = useStateContext();
  const [save, setSave] = useState(false)
  const { user } = useContext(userContext)

    //save coin for each user in different paths
  const itemPath = doc(db, 'users', `${user?.email}`);

  const saveItem = async () => {
    if (user?.email) {
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
            width={300}
            height={300}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>

        </div>
      </Link>
      <button onClick={() => saveItem()}>favorite</button>
    </div>
  )
}

export default IndividualProduct