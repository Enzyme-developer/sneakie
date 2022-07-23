import React from 'react'
import Link from 'next/link';

import { urlFor } from '../LIB/client';

const bannerData = ({bannerData}: {bannerData: any}) => {
  return (
    <div className="hero-banner">
      <div className="hero-banner-container">

        <div className='hero-banner-text'>
          <p className="beats-solo">{bannerData.smallText}</p>
          <h3>{bannerData.midText}</h3>
          <h1>{bannerData.largeText1}</h1>
          <Link href={`/product/${bannerData.product}`}>
            <button type="button">{bannerData.buttonText}</button>
          </Link>

          <div className="desc">
            <h5>Description</h5>
            <p>{bannerData.desc}</p>
          </div>
          
        </div>


        <div className='hero-banner-image-div'>
          <img src={urlFor(bannerData.image)} alt="headphones" className="hero-banner-image" />
        </div>


      </div>
    </div>
  )
}

export default bannerData