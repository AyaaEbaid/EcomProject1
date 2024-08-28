import React, { useState } from 'react';
import styles from "./ForgottenPassword.module.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, { email }).then((data)=>{
        console.log(data.data);
        if (data.data.message=="Reset code sent to your email") {
          setMessage('Password reset link sent to your email.');
          navigate("/resetpassword");
        } else {
          setMessage('There was an error. Please try again.');
        }
      });

     
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
    <div className='container mx-auto  py-10'>
      <h2 className='font-extrabold text-main py-2 text-center'>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
        <input 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button  className="bg-main my-3 py-3 px-4 rounded-lg text-white"
                 type="submit">Send Reset Link</button>
       
      </form>
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default ForgotPassword;