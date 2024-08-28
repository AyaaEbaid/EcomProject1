import React, { useEffect, useState } from 'react'
import styles from "./AllOrders.module.css"
import axios from 'axios'
export default function AllOrders() {
const [orders, setOrders] = useState([])
  async function getOrders() {
   
    return await axios.get("https://ecommerce.routemisr.com/api/v1/orders/").then((data)=>{
      console.log(data?.data?.data);
       setOrders(data?.data?.data)
    }).catch((error)=>{
      console.log(error);

      
    })
    
  }useEffect(() => {
   getOrders();
  }, [])
  


  return (

    <>
             
             <div className="container mx-auto mt-20 min-h-screen">
        <div className="flex flex-wrap">
        {orders.map((orders) => (
            <div key={orders.id} className=" md:w-1/6 p-5"> 
                 
                 <img src={orders?.cartItems?.imageCover} className="w-full h-[250px]" alt="" />
                 <h2 className="text-main font-bold  text-center">Name: {orders. user.name}</h2>
                <h2 className="text-black font-bold text-center">TotalOrderPrice: {orders.totalOrderPrice}</h2>
               
                <h2 className="text-black font-bold  text-center">Phone: {orders. user.phone}</h2>
         

                
               
               
             
            </div>
          ))} 
        </div>
      </div> 
          
        
        
       
    
    </>
  )
}
