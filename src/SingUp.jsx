/** @format */

import React from "react";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { withUser } from "./WithProvider";

import axios from "axios";
function SignUp({ setUser }) {
  const [error, seterror] = useState();
  function LoginChecker(values) {
    axios
      .post("https://myeasykart.codeyogi.io/signup", {
        email: values.email,
        password: values.password,
        fullName: values.userName,
      })
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user.full_name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userId", user.id);
        setUser(user);
      })
      .catch((err) => {
        seterror("Email Already registered");
        setTimeout(() => {
          seterror(undefined);
        }, 2000);
      });
  }

  const Schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    userName: Yup.string().min(8).required(),
    Mobile: Yup.string().min(10).required(),
    Name: Yup.string().min(8).required(),
    confirm_password: Yup.string()
      .min(8, "Please enter password be at least 8 characters")
      .required("Please enter the Password"),
  });
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
    isValid,
    dirty,
    // user ne kuch change kiya hoga to intial value flase hogi
  } = useFormik({
    // use formik ka function hai ye hadlesumbit,hadlechange,values etc)
    initialValues: {
      email: "",
      password: "",
      userName: "",
      Mobile: "",
      Name: "",
      confirm_password: "",
    },
    onSubmit: LoginChecker,
    validationSchema: Schema,
    validateOnMount: true,
  });
  if (values.password != values.confirm_password) {
    errors.confirm_password = "Password Or Confirm Password Not be Match";
  }

  console.log("errors", errors);
  return (
    <>
      <div className=" grow">
        <div className="w-full h-full p-8 bg-gray-200 sm:p-20">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-5xl mx-auto bg-white "
          >
            <div className="flex items-center p-2 text-white bg-blue-800 text-md ">
              New User Registration
            </div>
            <div className="grid-cols-2 gap-2 p-4 bg-white rounded-b-sm md:grid">
              <div>
                <p>Full Name</p>

                <div className="flex items-center mt-2 mb-2 border border-black border-box">
                  <div className="border-r border-black">
                    <FiUser className="m-2 text-2xl" />
                  </div>
                  <input
                    values={values.userName}
                    touched={touched.userName}
                    errors={errors.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="userName"
                    type="name"
                    required
                    className="relative block w-full px-3 py-2 placeholder-gray-500 border-gray-300 rounded-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Full
                  Name"
                  />
                </div>
                <div>
                  {touched.userName && (
                    <div className="text-sm text-red-500">
                      {errors.userName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p>Email Address</p>

                <div className="flex items-center mt-2 mb-2 border border-black border-box">
                  <div className="border-r border-black">
                    <AiOutlineMail className="m-2 text-2xl" />
                  </div>
                  <input
                    values={values.email}
                    touched={touched.email}
                    errors={errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    type="email"
                    required
                    className="relative block w-full px-3 py-2 placeholder-gray-500 border-gray-300 rounded-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email
                  Address"
                  />
                </div>
                <div>
                  {touched.email && errors.email && (
                    <div className="text-sm text-red-500">{errors.email}</div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="number">Mobile Number</label>
                <div className="flex items-center mt-2 mb-2 border border-black border-box">
                  <div className="border-r border-black">
                    <IoCallOutline className="m-2 text-2xl" />
                  </div>
                  <h1 className="ml-2 sm:text-sm">+91</h1>
                  <input
                    id="number"
                    type="number"
                    value={values.Mobile}
                    name="Mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="relative block w-full px-1 py-2 placeholder-gray-500 border-gray-300 rounded-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Mobile Number"
                  />
                </div>
                {touched.Mobile && errors.Mobile && (
                  <div className="flex items-center text-sm text-red-600">
                    {errors.Mobile}
                  </div>
                )}
              </div>

              <div>
                <p>User Name</p>

                <div className="flex items-center mt-2 mb-2 border border-black border-box">
                  <div className="border-r border-black">
                    <FiUser className="m-2 text-2xl" />
                  </div>
                  <input
                    values={values.Name}
                    touched={touched.Name}
                    errors={errors.Name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="Name"
                    type="name"
                    required
                    className="relative block w-full px-3 py-2 placeholder-gray-500 border-gray-300 rounded-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="User
                  Name"
                  />
                </div>
                <div>
                  {touched.Name && errors.Name && (
                    <div className="text-sm text-red-500">{errors.Name}</div>
                  )}
                </div>
              </div>

              <div>
                <p>Password</p>

                <div className="flex items-center mt-2 mb-2 border border-black border-box">
                  <div className="border-r border-black">
                    <RiLockPasswordFill className="m-2 text-2xl" />
                  </div>
                  <input
                    values={values.password}
                    touched={touched.password}
                    errors={errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type="password"
                    required
                    className="relative block w-full px-3 py-2 placeholder-gray-500 border-gray-300 rounded-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="
                  Password"
                  />
                </div>
                <div>
                  {touched.password && errors.password && (
                    <div className="text-sm text-red-500">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p>Confirm Password</p>

                <div className="flex items-center mt-2 mb-2 border border-black border-box">
                  <div className="border-r border-black">
                    <RiLockPasswordFill className="m-2 text-2xl" />
                  </div>
                  <input
                    value={values.confirm_password}
                    touched={touched.confirm_password}
                    errors={errors.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="confirm_password"
                    type="password"
                    required
                    className="relative block w-full px-3 py-2 placeholder-gray-500 border-gray-300 rounded-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Confirm
                  Password"
                  />
                </div>
                <div>
                  {values.confirm_password && errors.confirm_password && (
                    <div className="text-sm text-red-500">
                      {errors.confirm_password}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {error && (
              <div className="flex items-center justify-center mt-2 text-lg font-bold text-red-500 bg-gray-200">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between bg-gray-200">
              <div className="items-center mt-5 md:flex md:flex-row md:gap-2">
                <div>Already have an account ?</div>
                <div className="mt-2">
                  <Link
                    to={"/login"}
                    className="px-5 py-2 font-bold text-white bg-red-500 rounded-md"
                  >
                    Login
                  </Link>
                </div>
              </div>
              <button
                disabled={!isValid}
                className="px-5 py-2 mt-6 font-bold text-white bg-green-500 rounded-md disabled:bg-green-300"
                type="sumbit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default withUser(SignUp);
