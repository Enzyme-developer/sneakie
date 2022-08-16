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
  const categories: any = ["all", "footwear", "clothing", "Jewelry", "Lighting", "Electronics", "Courses"]
  
  console.log(option)


  productItems.filter((product: any) => {
    if (text === '') {
      return product
    } else if (
      product.name.toLowerCase().includes(text.toLowerCase())
    ) {
      return product
    }
  })


  useEffect(() => {
    if (text !== '') {
      const textFiltered = productItems.filter((item: any) => (
        item.name.toLowerCase().includes(text.toLowerCase())
      ))
      setProductItems(textFiltered)
    } else {
      setProductItems(products)
    }
  }, [text])



  useEffect(() => {
    if (categoryType !== 'all') {
      const filtered = productItems.filter((item: any) => (
        item.details.toLowerCase().includes(categoryType.toLowerCase())
      ))
      // console.log(filtered)
      setProductItems(filtered)
    } else {
      setProductItems(products)
    }
  }, [categoryType])



  useEffect(() => {
    if (range > 0) {
      const filteredRange = productItems.filter((item: any) => (
        item.price <= range
      ))
      // console.log(filteredRange)
      setProductItems(filteredRange)
    } 
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

    } else if (option == 'normal') {
      const filteredOption = productItems.sort((a: any, b: any) =>
      a.name - b.name
    )
    setProductItems(filteredOption)
    } else {
      setProductItems(products)
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
          <option value="normal">sort by Alphabet</option>
          <option value="lowest">sort by Lowest Price</option>
          <option value="highest">sort by Highest Price</option>
        </select>

        <div>
          {categories.map((category: any) => (
            <h1 onClick={ () =>setCategortType(category)}>{category}</h1>
          ))}
        </div>

        <div>
          <input type="text" onChange={(e) => setText(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="priceRange">Price Filter</label>
          <input onChange={(e) => setRange(Number(e.target.value))} type={'range'} min="40" defaultValue={0} max="100" step="10" />
          <div>{range}</div>
          <button onClick={clearFilter}>Clear Filter</button>
        </div>

    
        <div className="products-container">
          {productItems.length > 0 ? (
            productItems.map((product: any) => (
              <IndividualProduct key={product._id} product={product} />
            )))
            : (<h1>No Result</h1>)
          } 
        </div>

    
          {/* {productItems.length ==0 && (
            <h1>Not found</h1>
          ) } */}
      

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