import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Feature() {
let {addProductToCart}=useContext(CartContext)
async function addToCart(productId){
 let response=await addProductToCart(productId)
 console.log(response);
 
}

function getFetureproducts(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}
 let {data ,isLoading,isError,isFetched,error}= useQuery({
    queryKey:["featureProducts"],
    queryFn:getFetureproducts,
    staleTime:3000,
    retry:2,
  })
  console.log(data?.data?.data);
  

  
  return (
    <>
   
      <div className="container mx-auto">
        {isError? <div className="flex justify-center items-center"><p className=" bg-red-300"> Network Error</p></div>:null}
        {isLoading ?<Loader/>: <div className="flex flex-wrap">
          {data?.data.data.map((product) => (
            <div key={product?.id} className="w-1/6 ">
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
    </>
  );
}
