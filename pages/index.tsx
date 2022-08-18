import React, { useEffect, useState } from 'react';
import { client } from '../LIB/client';
import Banner from '../components/Banner';
import FooterBanner from '../components/FooterBanner';
import IndividualProduct from '../components/IndividualProduct';
import toast, { Toaster } from 'react-hot-toast';


const Home = ({ products, bannerData }: { products: []; bannerData: any; }) => {

  const [text, setText] = useState<string>('')
  const [option, setOption] = useState<string>('')
  const [productItems, setProductItems] = useState<any[]>(products)
  const [range, setRange] = useState<number>(0)
  const categories: [key1: string, key2: string, key3: string, key: string] = ["Footwear", "Clothings",  "Lighting", "Gadgets"]
  
  // console.log(productItems)
  // console.log(option)

  
  //filter by category
  const filterItem = (curItems: string) => {
    const newItem : any = products.filter((newVal: any) => {
      return newVal.category === curItems; 
    });
    setProductItems(newItem);
    window.scrollTo({
      top: 1300,
      behavior: 'smooth',
  });
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
        window.scrollTo({
      top: 1300,
      behavior: 'smooth',
    });

    } else if (option == 'lowest') {
      const filteredOption = products.sort((a: Provider, b: Provider) =>
        b.price - a.price
      )
      setProductItems(filteredOption)
      window.scrollTo({
        top: 1300,
        behavior: 'smooth',
    });

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
        <Toaster />
        {/* Banner */}
        <Banner bannerData={bannerData.length && bannerData[0]} />
    
        
        {/* Heading */}
        <div className="products__heading">
          <h2>Best Products at the best prices</h2>
          {/* <p>Shop with us and be the envy of your friends</p> */}
        </div>

        
        {/* categories */}
        <div className='category'>
          <div className='category__all' onClick={() => setProductItems(products)}>All</div> 
          {categories.map((category: any, index: number) => (
          <div className='single__category' key={index} onClick={ () =>filterItem(category)}>{category}</div>
          ))}
        </div>

        
        {/* search by text */}
        <div className='search'>
          <input className='search__input' type="text" placeholder='search' onChange={(e) => setText(e.target.value)}/>
        </div>

        
        <div className="filter">
        {/* sort by price range */}
        <div>
          <label htmlFor="priceRange">Price Filter</label>
          <input className='range' onChange={(e) => setRange(Number(e.target.value))} type={'range'} min="10" defaultValue={100} max="100" step="10" />
          <div>{range}</div>
        </div>

        {/* filter by sorting */}
        <div className="select">
          <select onChange={(e) => setOption(e.target.value)}>
            <option value="lowest">sort by Lowest Price</option>
            <option value="highest">sort by Highest Price</option>
          </select>
        </div>
        </div>
        

        
        {/* clear all filters */}
        <button onClick={clearFilter} className='clear'>Clear Filter</button>

    
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