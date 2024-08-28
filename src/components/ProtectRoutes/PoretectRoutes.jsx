import React from 'react'
import styles from "./PoretectRoutes.module.css"
import { Navigate } from 'react-router-dom'

export default function PoretectRoutes(props) {


    if(localStorage.getItem("userToken")){
       return props.children;
    }
    else{
        return <Navigate to="/login"></Navigate>
    }
  
}
