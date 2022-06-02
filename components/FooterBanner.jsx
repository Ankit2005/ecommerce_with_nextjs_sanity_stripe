import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const FooterBanner = ({ footerBannerData }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{footerBannerData.discount}</p>
          <h3>{footerBannerData.largeText1}</h3>
          <h3>{footerBannerData.largeText2}</h3>
          <p>{footerBannerData.saleTime}</p>
        </div>
        <div className="right">
          <p>{footerBannerData.smallText}</p>
          <h3>{footerBannerData.midText}</h3>
          <p>{footerBannerData.desc}</p>
          <Link href={`product/${footerBannerData.product}`}>
            <button type="button">{footerBannerData.buttonText}</button>
          </Link>
        </div>
        <img
          className="footer-banner-image"
          src={urlFor(footerBannerData.image)}
          alt={footerBannerData.product}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
