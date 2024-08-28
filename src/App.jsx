import { useState } from 'react'

import './App.css'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Notfound from './components/Notfound/NotFound'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import ProtectAuth from './components/ProtectAuth/ProtectAuth'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails'
import toast, { Toaster } from 'react-hot-toast';

import Checkout from './components/Checkout/Checkout'
import { Offline } from "react-detect-offline";
import AllOrders from './components/AllOrders/AllOrders'
import ForgottenPassword from './components/ForgottenPassword/ForgottenPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'


function App() {

  const queryClient = new QueryClient()

let routes=createBrowserRouter([{
  path:"/Ecom/",element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"/Ecom/login",element:<ProtectAuth><Login/> </ProtectAuth>},
    {path:"/Ecom/register",element:<ProtectAuth><Register/></ProtectAuth> },
    {path:"/Ecom/cart",element:<Cart/>},
    {path:"/Ecom/cat",element:<Categories/> },
    {path:"/Ecom/brands",element:<Brands/> },
    {path:"/Ecom/products",element:<Products/>},
    {path:"/Ecom/allorders",element:<AllOrders/>},
    {path:"/Ecom/forgotten",element:<ForgottenPassword/>},
    {path:"/Ecom/checkout",element:<Checkout/>},
    {path:"/Ecom/resetpassword",element:<ResetPassword/>},


    {path:"/Ecom/productdetails/:id/:category",element:<ProductDetails/>},
    {path:"/Ecom/*",element:<Notfound/> },
    
    
  ]
}])

  return (
    <>
     <QueryClientProvider client={queryClient}>

     <RouterProvider router={routes}></RouterProvider>
     <ReactQueryDevtools initialIsOpen={false} />
     <Offline>
      <div className="fixed top-48 left-1 py-2 px-3 rounded-lg bg-red-600 text-white">You are offline</div>

     </Offline>
     <Toaster/>
     </QueryClientProvider>
    
    </>
  )
}

export default App
