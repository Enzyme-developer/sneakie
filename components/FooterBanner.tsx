import React from 'react';
import Link from 'next/link';
import footerImage from '../assets/footer.jpg'

import { urlFor } from '../LIB/client';

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, footerimage } } : any) => {

  return (
    <div className="footer__banner" style={{backgroundColor: "#00274b"}}>

    <div className="footer__banner__container">

      <div className='footer__banner__text'>
        <h1>{largeText1}</h1>
        <h3>{smallText}</h3>
        <h3>{midText} for {saleTime}</h3>
        <Link href={`/product/${product}`}>
          <button type="button">{buttonText}</button>
        </Link>
      </div>

      <div className='footer-banner-image-div'>
        <img src={urlFor(footerimage)} alt="Cart" className="footer-banner-image" />
      </div>

    </div>
  </div>

  )
}

export default FooterBanner