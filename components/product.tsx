import Link from 'next/link';
//for fetching images
import { urlFor } from '../LIB/client';

const Product = ({ product: { image, name, slug, price } } :any) => {
  return (
    <div>
      {/* go to clicked product by using slug.current */}
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            width={300}
            height={300}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product