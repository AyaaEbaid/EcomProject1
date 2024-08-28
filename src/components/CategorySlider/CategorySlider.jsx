import React from "react";
import styles from "./CategorySlider.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery({
    queryKey: "categorySlider",
    queryFn: getCatSlider,
  });
  console.log(data?.data, data);

  return (
    <>
      <div className="container mx-auto my-10">
        <h1 className="font-semibold text-xl py-2"> Shop Populer Categories</h1>
        <Slider {...settings}>
          {data?.data.data.map((cat) => <div className="text-center">

            <img src={cat.image} className="h-[200px]" alt="" />
            <p >{cat.name}</p>
          </div>
           
          )}
           
        </Slider>
      </div>
    </>
  );
}
