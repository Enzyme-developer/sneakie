import React from 'react';
import { client } from '../LIB/client';
import Banner from '../components/Banner';
import FooterBanner from '../components/FooterBanner';
import IndividualProduct from '../components/IndividualProduct';
import Signup from '../components/Signup';


const Home = ({ products , bannerData } : {
  products: [];
  bannerData: any;
}) => (
  <div>
    <Banner bannerData={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Seller Sneakers</h2>
      <p>Be the envy of your friends</p>
    </div>

    <div className="products-container">
      {products.map((product :any) => (
        <IndividualProduct key={product._id} product={product} />
      ))}
    </div>

    <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    <Signup />
  </div>
);


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