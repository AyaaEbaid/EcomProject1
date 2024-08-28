import React, { useEffect, useState } from 'react'
import styles from "./Categories.module.css"
import { Helmet } from 'react-helmet';
import axios from 'axios';

 export default function Categories() {
const [category, setCategory] = useState([])
  async function getCategory() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data)=>{
      console.log(data.data.data);
      setCategory(data.data.data)
      
    }).catch((error)=>{
      console.log(error);
      
    })
    
  }
  useEffect(() => {
    getCategory();
  
   
  }, [])
  


  
 
  return (
    <>
     <div className="container mx-auto mt-20 min-h-screen">
        <div className="flex flex-wrap">
          {category.map((category) => (
            <div key={category.id} className=" md:w-1/6">
              <div className="p-5 w-full">
                <img src={category.image} className="w-full h-[250px]" alt="" />
                <h5 className="text-main text-center">{category.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div> 

      
      
      <Helmet>
                <meta charSet="utf-8" />
                <title>Category</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      </>
  )
}
