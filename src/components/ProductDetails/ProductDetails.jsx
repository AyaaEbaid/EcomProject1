import React, { useContext, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Slider from "react-slick";
import { date } from "yup";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let {addProductToCart}=useContext(CartContext)
  async function addToCart(productId){
    let response=await addProductToCart(productId)
    console.log(response);

}
 let {id ,category}=useParams()
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([])
  async function getProductDetails() {

    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
      console.log(data?.data.data);
      
        setProductDetails(data?.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }

  async function getRelatedProduct() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((data) => {
       console.log(data?.data.data);
       let relatedProducts=data?.data.data;
       relatedProducts=relatedProducts.filter((product)=>product.category.name==category);
       setRelatedProducts(relatedProducts)
       
      })
      .catch((err) => {
     
     
      });
  }

  useEffect(() => {
    getProductDetails();
    getRelatedProduct();
  }, []);
  useEffect(() => {
     getProductDetails();
   
  }, [id]);


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
  };
 
 
   

  

  return (
    <>
      <div className="container mx-auto mt-20 h-screen">
       {isLoading?<Loader/>:null}
        <div  key={productDetails?.id} className="flex">
          <div  className="w-1/4 px-10">
          <Slider {...settings}>
      {productDetails?.images?.map((src)=> <img src={src} className="w-full" alt="" />)}
    </Slider>
      {/* <img src={productDetails.imageCover} className="w-full" alt="" />  */}
          </div>  
          <div className="w-3/4 mt-10 ">
            <h1 className="text-black font-bolder my-5 text-2xl">
              {productDetails?.title}
            </h1>
            <h4 className="text-gray-700 my-5">{productDetails.description}</h4>
            <p>{productDetails.category?.name}</p>
            <div className="flex  justify-between items-center">
              <p className="w-1/2">{productDetails.price}EGP</p>
              <div className="w-1/2">
                <i className="text-yellow-300 fa fa-star"></i>
                {productDetails.ratingsQuantity}
              </div>
            </div>
            <div className="text-center my-8">
                    
                     <button onClick={()=>addToCart(productDetails.id)} className="py-3 w-full px-3 bg-main text-white btn rounded-md">
                add to cart 
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto">
      <h1 className="text-center font-bold">Related product</h1>
        {isLoading ?<Loader/>: <div className="flex flex-wrap">
          {relatedProducts.map((product) => (
            <div key={product.id} className="w-1/6 ">
              <div className="product p-3">
               <Link to={`/productdetails/${product.id}/${product.category.name}`}>
               
               <img src={product.imageCover} className="w-full" alt="" />
                <h5 className="text-main">{product.category.name}</h5>
                <p>{product.title.split(" ").splice(0,2).join(" ")}</p>
                <div className="flex  justify-between items-center">
                  <p className="w-1/2">{product.price}EGP</p>
                  <div className="w-1/2">
                    <i className="text-yellow-300 fa fa-star"></i>
                    {product.ratingsQuantity}
                  </div>
                 
                </div>

               
               </Link>
               <div className="text-center">
                   
                   <button onClick={()=>addToCart(product.id)} className="py-3 px-3 bg-main text-white btn rounded-md">
                     add to cart 
                   </button>
                 </div>
               
              </div>
            
            
            </div>
          ))}
        </div>}
      
       
      </div> 
      <Helmet>
                <meta charSet="utf-8" />
                <title>{productDetails?.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      
    </>
  );
}
