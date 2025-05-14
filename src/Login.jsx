/** @format */

import axios from "axios";
import React from "react";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiError } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withUser } from "./WithProvider";
function Login({ setUser, setAlert, productCount }) {
  function callLoginApi(values) {
    axios
      .post("https://myeasykart.codeyogi.io/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log(response);
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user.full_name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userId", user.id);
        setUser(user);
      })
      .catch(() => {
        setAlert("Email not verified");
      });
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter the email"),
    password: Yup.string()
      .min(8, "Please enter password be at least 8 characters")
      .required("Please enter the Password"),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: callLoginApi,
    validationSchema: schema,
    validateOnMount: true,
  });

  return (
    <>
      <div className="bg-white pt-8">
        <div className="h-screen w-full  flex justify-center ">
          <form onSubmit={handleSubmit} className="flex flex-col w-96 p-5">
            <FaRegUserCircle className="self-center text-8xl text-blue-600" />
            <div className="text-4xl font-semibold self-center mb-4 mt-2 ">
              LOG IN
            </div>
            <div>
              <div
                className="flex items-center mt-2 border-box mb-2 border 
             border-gray-500"
              >
                <label htmlFor="email-address" className="sr-only">
                  Email-Address
                </label>
                <div
                  className="border-r
              border-gray-400"
                >
                  <BiUser className="text-2xl m-2" />
                </div>
                <input
                  value={values.email}
                  id="email-address"
                  name="email"
                  onBlur={handleBlur}
                  type="email"
                  onChange={handleChange}
                  className="relative block w-full 
                appearance-none rounded-sm
                border-black px-3 py-2 placeholder-gray-500
                 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              {touched.email && errors.email && (
                <div className="text-red-600 text-sm flex items-center">
                  <BiError />
                  {errors.email}
                </div>
              )}
              <div
                className="flex items-center mt-2 border-box mb-4 border 
            border-gray-500"
              >
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div
                  className="border-r
             border-gray-400"
                >
                  <RiLockPasswordFill className="text-2xl m-2" />
                </div>
                <input
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  id="password"
                  type="password"
                  onChange={handleChange}
                  className="relative block w-full 
        appearance-none rounded-sm
         border-black px-3 py-2  placeholder-gray-500
         focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              {touched.password && errors.password && (
                <div className="text-red-600 text-sm flex items-center">
                  <BiError />
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white py-2 rounded-md mt-6 font-bold disabled:bg-red-200"
              disabled={!isValid}
            >
              LOGIN
            </button>

            <Link
              to={"/log-in/forget-password/"}
              className="text-blue-800 font-bold mt-2 self-end underline"
            >
              Forgot Password?
            </Link>
            <Link className="self-center mt-8" to={"/sign-up/"}>
              <button
                type="button"
                className="bg-green-500 text-white  py-2 px-5  rounded-md font-bold"
              >
                Create New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default withUser(Login);
