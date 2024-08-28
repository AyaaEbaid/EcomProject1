import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useSubmit } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Register() {
  const [userMessage, setuserMessage] = useState(null);
  const [userError, setuserError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  let mySchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "cannot be less than 3 char")
      .max(10, "cannot be more than 3 char"),
    email: Yup.string().required("email is rqiured").email("invailed"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "password not vaild"),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")], "repass not match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002)?01[0125][0-9]{8}$/),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values);
    },
  });
  async function registerForm(values) {
    setisLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        console.log(data.data.message);
        setuserMessage(data.data.message);
        setisLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setisLoading(false);
        setuserError(err.response.data.message);
      });
  }

  return (
    <>
      <div className="container py-24 w-[75%] mx-auto">
        {userError ? (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {userError}
          </div>
        ) : null}
        {userMessage ? (
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {userMessage}
          </div>
        ) : null}
        <h1 className="text-main text-xl">Register Now:</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="py-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              name:
            </label>
            <input
              name="name"
              type="text"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {formik.touched.name && formik.errors.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div className="py-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              email:
            </label>
            <input
              name="email"
              type="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="py-2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              password:
            </label>
            <input
              name="password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.password && formik.errors.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="py-2">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              rePassword:
            </label>
            <input
              name="rePassword"
              type="password"
              id="rePassword"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
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
            {<formik className="touched ph"></formik> && formik.errors.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <div className="text-end  my-20">
            {isLoading ? (
              <button
                type="submit"
                className="bg-main py-3 px-4 rounded-lg text-white"
              >
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="bg-main py-3 px-4 rounded-lg text-white"
                disabled={!(formik.dirty&& formik.isValid)}
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    </>
  );
}
