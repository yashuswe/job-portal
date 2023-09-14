import React, { useState } from "react";
import Header from "@/common/Header";
import Input from "@/@components/Input";
import { useLoginView } from "./views/useLoginView";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import useUnsavedChanges from "@/hooks/UseUnsavedChanges";

const Login = () => {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handleFormSubmit,
    // handleSubmit, // The form submit function
    handlePasswordChange,
  } = useLoginView();

  const isFormDirty = useUnsavedChanges();

  return (
    <Header>
      <form onSubmit={handleFormSubmit}>
        {" "}
        <div
          className={`bg-white mx-auto w-min mt-32 p-7 rounded-2xl flex-col text-primary shadow-3xl`}
        >
          <h1 className="text-primary font-medium text-xl mb-6">Login</h1>
          <Input
            type="email"
            placeholder="Enter your Email"
            onChange={handleEmailChange}
            value={email}
            label="Email Address"
            name="email"
          />
          {emailError && (
            <div className="text-red-500 text-sm font-fp mt-1">
              {emailError}
            </div>
          )}
          <div className="flex justify-between mb-2">
            <div className="text-sm h-4">Password</div>
            <Link href="/forgot-password" className="text-sky-blue text-sm h-4">
              Forgot your Password?
            </Link>
          </div>
          <input
            type="password"
            className="placeholder-primary placeholder:text-xs p-4 placeholder-opacity-40 w-[497px] h-[46px]  border border-form-gray2 shadow-inner rounded-md  focus:outline-none focus:border-sky-blue bg-form-gray"
            placeholder="Enter your password"
            required
            onChange={handlePasswordChange}
            value={password}
          />
          {passwordError && (
            <div className="text-red-500 text-sm font-fp mt-1">
              {passwordError}
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit" // Specify the button type as "submit"
              className="w-36 h-12 bg-sky-blue border-1 border-sky-blue mt-10 rounded-md mb-14"
            >
              <div className="text-white font-fp font-medium py-3 px-14">
                Login
              </div>
            </button>
          </div>
          <div className="text-sm text-center font-normal">
            New to MyJobs?
            <Link href="signup" className="text-sky-blue ml-1 font-normal">
              Create an account
            </Link>
          </div>
        </div>
      </form>
    </Header>
  );
};

export default Login;
