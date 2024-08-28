import React from 'react'
import styles from "./ProtectAuth.module.css"
import { Navigate } from 'react-router-dom'
export default function ProtectAuth(props) {

if(localStorage.getItem("userToken")){
  return <Navigate to="/"></Navigate>
}
else
{
   return props.children;
  

  
}

 
}
