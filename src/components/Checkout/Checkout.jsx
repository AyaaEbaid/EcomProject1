import React, { useContext, useEffect, useState } from 'react'
import styles from "./Checkout.module.css"
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useLocation } from 'react-router-dom';
export default function Checkout() {
  let{onlinePayment,cashPayment}=useContext(CartContext)
  const [paymentType, setPaymentType] = useState(null)
  let {state}=useLocation()
  console.log(state.type);
  useEffect(() => {
   setPaymentType(state.type);

  }, [])
  
  let formik = useFormik({
    initialValues: {
     details: "",
        phone: "",
        city: ""
     
    },
    
    onSubmit: (values) => {
   payOnline(values)
      
    },
  });
  async function payOnline(values){
  
    if(paymentType=="Online Payment"){
      await onlinePayment(values);
    }
    else{
      await cashPayment(values);
    }
  }
  return (
    <>
    <div className="w-1/2 mx-auto">
    <h2 className='text-center text-main text-lg font-extrabold'>{paymentType}</h2>
    <form onSubmit={formik.handleSubmit}>
          
          <div className="py-2">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              details:
            </label>
            <input
              name="details"
              type="text"
              id="details"
              onChange={formik.handleChange}
              value={formik.values.details}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.details && formik.errors.details ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.details}
              </div>
            ) : null}
          </div>
          <div className="py-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              phone:
            </label>
            <input
              name="phone"
              type="tel"
              id="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <div className="py-2">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              city:
            </label>
            <input
              name="city"
              type="text"
              id="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.city && formik.errors.city ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.city}
              </div>
            ) : null}
          </div>
          
          <div className="text-end  my-20">
          
              <button
                type="submit"
                className="bg-main py-3 px-4 rounded-lg text-white"
                disabled={!(formik.isValid&&formik.dirty )}

              >
                Paynow
              </button>
          
          </div>
        </form>
    </div>
    </>
  )
}
