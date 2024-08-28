import React, { useContext } from 'react'
import styles from "./Products.module.css"
import Feature from '../Feature/Feature'
import { Helmet } from 'react-helmet'

export default function Products() {
  
  return (
    <>
    <div className='h-screen'>

    <Feature/>
    </div>
  
    
    <Helmet>
                <meta charSet="utf-8" />
                <title>Product</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      
    </>
  )
}
