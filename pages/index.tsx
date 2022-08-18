import React, { useEffect, useState } from 'react';
import { client } from '../LIB/client';
import Banner from '../components/Banner';
import FooterBanner from '../components/FooterBanner';
import IndividualProduct from '../components/IndividualProduct';
import Favorites from '../components/Favorites';



const Home = ({ products, bannerData }: { products: []; bannerData: any; }) => {

  const [text, setText] = useState<string>('')
  const [option, setOption] = useState<string>('')
  const [productItems, setProductItems] = useState<any[]>(products)
  const [categoryType, setCategortType] = useState('all')
  const [range, setRange] = useState<number>(0)
  const categories: [key1: string, key2: string, key3:string, key:string] = ["Footwear", "Clothings",  "Lighting", "Gadgets"]
  
  // console.log(productItems)
  // console.log(option)

  
  //filter by category
  const filterItem = (curItems: string) => {
    const newItem : any = products.filter((newVal: any) => {
      return newVal.category === curItems; 
    });
    setProductItems(newItem);
  };


  //interface for each product
  interface Provider {
    price: number,
    name: string,
    slug: string,
    category: string
}



  // filter by price range
  useEffect(() => {
      const newItem = products.filter((newVal: Provider) => {
        return newVal.price <= range; 
      });
      setProductItems(newItem);
  }, [range])



  //filter by sorting
  useEffect(() => {
    if (option == 'highest') {
      const filteredOption = products.sort((a: Provider, b: Provider) =>
        a.price - b.price
      )
      setProductItems(filteredOption)

    } else if (option == 'lowest') {
      const filteredOption = products.sort((a: Provider, b: Provider) =>
        b.price - a.price
      )
      setProductItems(filteredOption)

    } else {
      setProductItems(products)
    } 
    }, [option])


  // clear all filters
  const clearFilter = () => {
    setProductItems(products)
 }



    return (
      <div>
 
        {/* Banner */}
        <Banner bannerData={bannerData.length && bannerData[0]} />
    
        {/* Heading */}
        <div className="products-heading">
          <h2>Best Seller Sneakers</h2>
          <p>Be the envy of your friends</p>
        </div>

        
        {/* filter by sorting */}
        <select onChange={(e) => setOption(e.target.value)}>
          <option value="lowest">sort by Lowest Price</option>
          <option value="highest">sort by Highest Price</option>
        </select>

        
        {/* categories */}
        <div>
          {categories.map((category: any) => (
            <h1 onClick={ () =>filterItem(category)}>{category}</h1>
          ))}
          <button onClick={() => setProductItems(products)}>All</button> 
        </div>

        
        {/* search by text */}
        <div>
          <input type="text" onChange={(e) => setText(e.target.value)}/>
        </div>

        
        {/* sort by price range */}
        <div>
          <label htmlFor="priceRange">Price Filter</label>
          <input onChange={(e) => setRange(Number(e.target.value))} type={'range'} min="10" defaultValue={100} max="100" step="10" />
          <div>{range}</div>
        </div>

        
        {/* clear all filters */}
        <button onClick={clearFilter}>Clear Filter</button>
    
        <div className="products-container">
          {productItems.length > 0 ? (
            productItems.filter((currentProduct: any) => {
              if (text === '') {
                return currentProduct
              } else if (
                currentProduct.name.toLowerCase().includes(text.toLowerCase())
              ) {
                return currentProduct
              }
            }
            ).map((product: any) => (
                <IndividualProduct key={product._id} product={product} />
              )))
            : (<h1>No Result</h1>)
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