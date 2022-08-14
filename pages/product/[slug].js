import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../LIB/client';
import Product from '../../components/IndividualProduct';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart, cartItems } = useStateContext();

    
  // useEffect(()=>{
  //   let prev_items = JSON.parse(localStorage.getItem('cartItems')) || [];
  //   // onAdd(prev_items)
  //   setIsInitiallyFetched(true)
  // },[])
  
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  //   console.log(cartItems)
  //   setIsInitiallyFetched(true)
  // }, [cartItems]);

  // useEffect(() => {
  //   if(isInitiallyFetched){
  //     localStorage.setItem("cartItems", JSON.stringify(cartItems));
  //     // total();
  //   }
  // }, [cartItems]);
  

  //handle buy function
  const handleBuy = () => {
    onAdd(product, qty);
    setShowCart(true);
  }


  return (
    <div>
      <div className="product-detail-container">
        <div>

          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>

          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>

            <p>(20)</p>
          </div>

          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>

          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuy} >Buy Now</button>
          </div>

        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>Similar Products</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}


//get static paths
export const getStaticPaths = async () => {
  // query for current slug
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}


//get static props
export const getStaticProps = async ({ params: { slug } }) => {
  //query for product current slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
}

export default ProductDetails;