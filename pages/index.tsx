import React, { useState } from 'react';
import { client } from '../LIB/client';
import Banner from '../components/Banner';
import FooterBanner from '../components/FooterBanner';
import IndividualProduct from '../components/IndividualProduct';
import Signup from '../components/Signup';
import Favorites from '../components/Favorites';


const Home = ({ products, bannerData }: { products: []; bannerData: any; }) => {

  const [text, setText] = useState('')
  const [option, setOption] = useState('')
  const [productItems, setProductItems] = useState(products)
  console.log(products)

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setOption(e.target.value);
  };

    return (
      <div>
 
        <Banner bannerData={bannerData.length && bannerData[0]} />
    
        <div className="products-heading">
          <h2>Best Seller Sneakers</h2>
          <p>Be the envy of your friends</p>
        </div>

        <select value={''} onChange={handleChange}>
          <option value="lowest">Lowest Price</option>
          <option value="highest">Highest Price</option>
        </select>

        <div>
          <input type="text" onChange={(e) => setText(e.target.value)}/>
        </div>

    
        <div className="products-container">
          {productItems.filter((product: any) => {
            if (text === '') {
              return product
            } else if (
              product.name.toLowerCase().includes(text.toLowerCase())
            ) {
              return product
            }
          })
          .map((product: any) => (
            <IndividualProduct key={product._id} product={product} />
          ))
          }
        </div>

            <Favorites />
        <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
      </div>
    );
}


//get server side props
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;