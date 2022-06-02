import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Banner = ({ bannerData }) => {
  return (
    <div className="hero-banner-container">
      {console.log(bannerData)}
      <div>
        <p className="beats-solo">{bannerData.smallText}</p>
        <h3>{bannerData.midText}</h3>
        <h1>{bannerData.largeText1}</h1>
        <img
          src={urlFor(bannerData.image)}
          alt="headephone"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${bannerData.product}`}>
            <button type="button">{bannerData.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>{bannerData.desc}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
