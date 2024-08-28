
import React, { useState } from 'react';
import styles from "./ResetPassword.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', { email, password }).then((data)=>{
        console.log(data);
        if (data.data.message=="Reset code sent to your email") {
          setMessage('Password reset successfully.');
          navigate("/");
        } else {
          setMessage('There was an error. Please try again.');
        }
      }).catch((err)=>{
        console.log(err);
        
      });

     
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='container mx-auto w-[75%]  py-14'>
      <h2  className='font-extrabold text-main py-2 text-center'>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
        <input 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password:</label>
        <input 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password:</label>
        <input 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <button
         className="bg-main py-3 px-4 my-3 rounded-lg text-white" type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;