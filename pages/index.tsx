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
  const [category, setCategory] = useState<string>('All')
  const categories: [key1: string, key2: string, key3: string, key4: string, key5: string,] = ["All", "Footwear", "Clothings",  "Lighting", "Gadgets"]
  
  // console.log(productItems)
  // console.log(option)

  
  //filter by category
  const filterItem = (curItems: string) => {
    if (category == 'All') {
      setProductItems(products)
    } else {
      const newItem: any = products.filter((newVal: any) => {
        return newVal.category === curItems;
      });
      window.scrollTo({
        top: 1000,
        behavior: 'smooth',
    });
      setProductItems(newItem);
    }
  };

  useEffect(() => {
    filterItem(category)
  }, [category])
  


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



  //filter by text 
  useEffect(() => { 
    if (text == '' ) {
      setProductItems(products)
    } else {
      const newItem = products.filter((newVal: Provider) => {
        return newVal.name.toLowerCase().includes(text.toLowerCase()); 
      });
      setProductItems(newItem);
    }
  }, [text])



  //filter by sorting
  // useEffect(() => {
  //     if (option === 'highest') {
  //       const filteredOption = products.sort((a: Provider, b: Provider) => a.price > b.price ? 1 : -1)
  //       setProductItems(filteredOption)
  //     }
  //       else if (option === 'lowest') {
  //       const filteredOption = products.sort((a: Provider, b: Provider) => a.price > b.price ? -1 : 1)
  //       setProductItems(filteredOption)
  //     } else {
  //       setProductItems(products)
  //     }
  //   }, [option])

    // console.log(option)


  
  // clear all filters
  const clearFilter = () => {
    setRange(100)
    setProductItems([...products])
    setText('')
 }

 

  {if (!products) return (<h1>No result</h1>)}

  function onSelectionChange(e: any) {
    const sortDirection = e.target.value;
    const copyArray = [...products]; // create a new array & not mutate state

    copyArray.sort((a: Provider, b:Provider) => {
      return sortDirection === "0" ? a.price - b.price : b.price - a.price;
    });
    setProductItems(copyArray); //re-render
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
          {categories.map((singleCategory: string, index: number) => (
          <div className={singleCategory === category? 'single__category__tab' : 'single__category'} key={index} onClick={() => setCategory(singleCategory)}>{singleCategory}</div>
          ))}
        </div>

        
        {/* search by text */}
        <div className='search'>
          <input className='search__input' value={text} type="text" placeholder='search' onChange={(e) => setText(e.target.value)} />
        </div>

        
        <div className="filter">
        {/* sort by price range */}
        <div>
          <label htmlFor="priceRange">Price Filter</label> <br />
          <input className='range' onChange={(e) => setRange(Number(e.target.value))} type={'range'} min="10" defaultValue={100} max="100" step="10" />
          <div>{range}</div>
        </div>

          
        {/* filter by sorting */}
        <div className="select">
          <select defaultValue={0} onChange={onSelectionChange}>
            <option value={0}>Sort By Lowest</option>
            <option value={1}>Sort by Highest</option>
          </select>
        </div>
        </div>
        

        
        {/* clear all filters */}
        <button onClick={clearFilter} className='clear'>Clear All Filters</button>

    
        <div className="products-container">
          {productItems.length > 0? (
            productItems.map((product: any) => (
                <IndividualProduct key={product._id} product={product} />
              )))
            : (<h1 style={{}}>No Result</h1>)
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