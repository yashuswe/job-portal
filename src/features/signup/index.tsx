"use client";
import React from "react";
import { useSignUpView } from "./views/useSignUpView";
import Header from "@/common/Header";
import Link from "next/link";
import Input from "@/@components/Input";
import RecruiterIcon from "@../../public/Images/search.png";
import CandidateIcon from "@../../public/Images/candidate.png";
import RecruiterIconCopy from "@../../public/Images/candidate_white.png";
import CandidateIconCopy from "@../../public/Images/user_white.png";
import "react-toastify/dist/ReactToastify.css";
import useUnsavedChanges from "@/hooks/UseUnsavedChanges";
import ImageComponent from "@/@components/ImageComponent";

const SignUp = () => {
  const {
    userRole,
    password,
    confirmPassword,
    name,
    email,
    skills,
    handleSubmit,
    handleCPasswordChange,
    handleEmailChange,
    handlePasswordChange,
    handleFullNameChange,
    handleSkillsChange,
    handleRoleChange,
    isFormValid,
    emailError,
    passwordError,
    confirmPasswordError,
  } = useSignUpView();

  const isFormDirty = useUnsavedChanges();

  return (
    <Header>
      <form onSubmit={handleSubmit}>
        <div
          className={`bg-white mx-auto w-min mt-6 p-7 rounded-2xl flex-col text-primary shadow-3xl`}
        >
          <h1 className="text-xl mb-6 font-medium">Signup</h1>
          <div className="font-fp text-sm mb-2">
            I am a<span className="text-sm">*</span>
          </div>
          <div className="flex">
            <div>
              <button
                className={`flex h-auto ${
                  userRole === 0
                    ? "bg-sky-blue text-white"
                    : "bggray-secondary border-1 border-gray-4"
                } py-3 pl-4 pr-7 w-[136px] focus:outline-none rounded-md focus:bg-sky-blue  selection:text-white mr-5 mb-5 p-2`}
                onClick={() => handleRoleChange(0)}
              >
                {userRole === 0 ? (
                  <ImageComponent src={CandidateIconCopy} alt="Image" />
                ) : (
                  <ImageComponent src={RecruiterIcon} alt="Image" />
                )}
                <span className="font-fp ml-2">Recruiter</span>
              </button>
            </div>
            <div>
              <button
                className={`flex h-auto ${
                  userRole === 1
                    ? "bg-sky-blue text-white"
                    : "bggray-secondary border-1 border-gray-4"
                } py-3 pl-4 pr-7 w-[136px] focus:outline-none rounded-md focus:bg-sky-blue  selection:text-white mr-5 mb-5 p-2`}
                onClick={() => handleRoleChange(1)}
              >
                {userRole === 1 ? (
                  <ImageComponent src={RecruiterIconCopy} alt="Image" />
                ) : (
                  <ImageComponent src={CandidateIcon} alt="Image" />
                )}
                <span className="font-fp ml-2">Candidate</span>
              </button>
            </div>
          </div>

          <div className="">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              name="name"
              required
              value={name}
              onChange={handleFullNameChange}
            />
          </div>

          <div className="">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              value={email}
              onChange={handleEmailChange}
              onBlur={() => isFormValid()}
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && (
              <div className="text-red-500 text-sm font-fp mt-1">
                {emailError}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <div className="flex-col">
              <div className="text-primary text-xs font-fp mb-2">
                Create Password <span className="text-xs">*</span>
              </div>
              <input
                className={`placeholder-primary placeholder:text-xs p-4 placeholder-opacity-40 md:mb-5 w-[238px] h-[46px] xl:mb-7  border border-form-gray2 shadow-inner rounded-md  focus:outline-none focus:border-sky-blue bg-form-gray ${
                  passwordError ? "border-red-500" : ""
                }`}
                type="password"
                placeholder="Enter your password"
                name="password"
                required
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => isFormValid()}
              />
              {passwordError && (
                <div className="text-red-500 text-sm font-fp mt-1">
                  {passwordError}
                </div>
              )}
            </div>

            <div className="flex-col">
              <div className="text-primary text-xs font-fp mb-2">
                Confirm Password <span className="text-xs">*</span>
              </div>
              <input
                className={`placeholder-primary placeholder:text-xs p-4 placeholder-opacity-40 md:mb-5 w-[238px] h-[46px] xl:mb-7  border border-form-gray2 shadow-inner rounded-md  focus:outline-none focus:border-sky-blue bg-form-gray ${
                  confirmPasswordError ? "border-red-500" : ""
                }`}
                type="password"
                placeholder="Enter your password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={handleCPasswordChange}
                onBlur={() => isFormValid()}
              />
              {confirmPasswordError && (
                <div className="text-red-500 text-sm font-fp mt-1">
                  {confirmPasswordError}
                </div>
              )}
            </div>
          </div>

          <div className="">
            <Input
              label="Skills"
              type="text"
              placeholder="Enter comma-separated skills"
              name="skills"
              value={skills}
              onChange={handleSkillsChange}
              onBlur={() => isFormValid()}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="w-36 h-12 bg-sky-blue border-1 border-sky-blue text-white font-fp font-medium mb-11 rounded-md text-sm"
              onClick={handleSubmit}
            >
              Signup
            </button>{" "}
          </div>
          <div className="flex justify-center text-sm font-fp font-normal">
            Have an account?
            <span className="text-sky-blue ml-1 text-sm">
              <Link href="/login">Login</Link>
            </span>
          </div>
        </div>
      </form>
    </Header>
  );
};

export default SignUp;
