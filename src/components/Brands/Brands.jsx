import React, { useEffect } from "react";
import styles from "./Brands.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../Redux/ProductSlice";
import { Helmet } from "react-helmet";

export default function Brands() {
  let dispatch = useDispatch();
  let { brands } = useSelector((state) => state.productRed);
  console.log(brands?.data);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await dispatch(getBrands());
  }
  return (
    <>
      <div className="container mx-auto mt-20 min-h-screen">
        <div className="flex flex-wrap">
          {brands?.data?.map((brands) => (
            <div key={brands.id} className=" md:w-1/6">
              <div className="p-5">
                <img src={brands.image} className="w-full" alt="" />
                <h5 className="text-main text-center">{brands.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}
