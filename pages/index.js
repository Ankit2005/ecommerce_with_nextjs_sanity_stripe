import React from "react";
import { client } from "../lib/client";
import { Product, Banner, FooterBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <Banner bannerData={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2> Best salling product</h2>
        <p>Speakers of any variations</p>
      </div>
      <div className="products-container">
        {products &&
          products.map((product, i) => <Product key={i} product={product} />)}
      </div>
      <FooterBanner footerBannerData={bannerData.length && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = `*[_type == "product"]`;
  const products = await client.fetch(productQuery);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
