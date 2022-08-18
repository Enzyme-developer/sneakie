import React, { useContext } from 'react'
import Link from 'next/link';
import { urlFor } from '../LIB/client';
import { userContext } from '../context/AuthContext';


const bannerData = ({ bannerData }: { bannerData: any }) => {

  const { user } = useContext(userContext)
  //get username
  let nameMatch = user?.email?.match(/^([^@]*)@/);
  const name = nameMatch ? nameMatch[1] : null;

  return (
    <div className="hero__banner">

      <div className="hero__banner__container">

        <div className='hero__banner__text'>
          {!user ? ('') :
            (<p>Hi, {name}</p>)
          }
          <h1>{bannerData.largeText1}</h1>
          <h3>{bannerData.smallText} {bannerData.midText}</h3>
          <Link href={`/product/${bannerData.product}`}>
            <button type="button">{bannerData.buttonText}</button>
          </Link>
        </div>

        <div className='hero-banner-image-div'>
          <img src={urlFor(bannerData.image)} alt="Canvas" className="hero-banner-image" />
        </div>

      </div>
    </div>
  )
}

export default bannerData