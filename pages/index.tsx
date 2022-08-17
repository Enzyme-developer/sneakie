import React, { useEffect, useState } from 'react';
import { client } from '../LIB/client';
import Banner from '../components/Banner';
import FooterBanner from '../components/FooterBanner';
import IndividualProduct from '../components/IndividualProduct';
import Signup from '../components/Signup';
import Favorites from '../components/Favorites';


const Home = ({ products, bannerData }: { products: []; bannerData: any; }) => {

  const [text, setText] = useState('')
  const [option, setOption] = useState('')
  const [productItems, setProductItems] = useState<any>(products)
  const [categoryType, setCategortType] = useState('all')
  const [range, setRange] = useState(0)
  const categories: any = ["Footwear", "Clothings",  "Lighting", "Gadgets"]
  
  console.log(productItems)
  console.log(option)

  
  const filterItem = (curItems: any) => {
    const newItem = products.filter((newVal: any) => {
      return newVal.category === curItems; 
    });
    setProductItems(newItem);
  };


  const filterItemByPrice = (range: any) => {
    const newItem = products.filter((newVal: any) => {
      return newVal.price <= range; 
    });
    setProductItems(newItem);
  };


  // const filterItemsBySorting = (option: any) => {
  //     if (option == 'lowest') {
  //       const newItems = productItems.sort((a: any, b: any) => {
  //       return b.price - a.price }
  //     )
  //     console.log(option)
  //     setProductItems(newItems)
      
  //     } else if(option =='highest') {
  //       const newItems = productItems.sort((a: any, b: any) => {
  //         return a.price - b.price }
  //     )
  //     setProductItems(newItems)
  //     } else {
  //       return productItems
  //   }
  // };



  // productItems.filter((product: any) => {
  //   if (text === '') {
  //     return product
  //   } else if (
  //     product.name.toLowerCase().includes(text.toLowerCase())
  //   ) {
  //     return product
  //   }
  // })


  // useEffect(() => {
  //   if (text !== '') {
  //     const textFiltered = productItems.filter((item: any) => (
  //       item.name.toLowerCase().includes(text.toLowerCase())
  //     ))
  //     setProductItems(textFiltered)
  //   } else {
  //     setProductItems(products)
  //   }
  // }, [text])




  useEffect(() => {
    // if (range > 0) {
    //   const filteredRange = productItems.filter((item: any) => (
    //     item.price <= range
    //   ))
    //   // console.log(filteredRange)
    //   setProductItems(filteredRange)
    // } 
      const newItem = products.filter((newVal: any) => {
        return newVal.price <= range; 
      });
      setProductItems(newItem);
  }, [range])



  useEffect(() => {
    if (option == 'highest') {
      const filteredOption = productItems.sort((a: any, b: any) =>
        a.price - b.price
      )
      setProductItems(filteredOption)

    } else if (option == 'lowest') {
      const filteredOption = productItems.sort((a: any, b: any) =>
        b.price - a.price
      )
      setProductItems(filteredOption)

    } else {
      const filteredOption = productItems.sort((a: any, b: any) =>
      a.name - b.name
    )
    setProductItems(filteredOption)
    } 
    }, [option])
  
  


  const clearFilter = () => {
    setRange(0)
    setCategortType('all')
    setText('')
    setOption('')
    setProductItems(products)
 }



    return (
      <div>
 
        <Banner bannerData={bannerData.length && bannerData[0]} />
    
        <div className="products-heading">
          <h2>Best Seller Sneakers</h2>
          <p>Be the envy of your friends</p>
        </div>

        <select onChange={(e) => setOption(e.target.value)}>
          <option value="lowest">sort by Lowest Price</option>
          <option value="highest">sort by Highest Price</option>
        </select>
        {/* <button onClick={() => filterItemsBySorting(option)}>Sort Products</button> */}

        
        <div>
          {categories.map((category: any) => (
            <h1 onClick={ () =>filterItem(category)}>{category}</h1>
          ))}
          <button onClick={() => setProductItems(products)}>All</button> 
        </div>

        <div>
          <input type="text" onChange={(e) => setText(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="priceRange">Price Filter</label>
          <input onChange={(e) => setRange(Number(e.target.value))} type={'range'} min="10" defaultValue={100} max="100" step="10" />
          <div>{range}</div>
          <button onChange={() => filterItemByPrice(range)} >Apply price Filter</button>
          <button onClick={clearFilter}>Clear Filter</button>
        </div>

    
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