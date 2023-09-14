"use client";
import Header from "@/common/Header";
import Input from "@/@components/Input";
import { useForgotPasswordView } from "./views/useForgotPasswordView";

const ForgotPassword = () => {
  const { email, emailError, handleEmailChange, handleSubmit, loading } =
    useForgotPasswordView();
  return (
    <Header>
      <form onSubmit={handleSubmit}>
        <div
          className={`bg-white mx-auto w-min mt-32 p-7 rounded-2xl flex-col
    text-primary shadow-3xl font-fp`}
        >
          <h1 className=" text-xl font-medium mb-5">Forgot your password?</h1>
          <div className="text-xs mb-5 font-normal">
            Enter the email associated with your account and we&apos;ll send you
            instructions to reset your password.
          </div>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          {emailError && (
            <div className="text-red-500 text-sm mt-2">{emailError}</div>
          )}
          <div className="flex justify-center">
            <button
              className="w-36 h-12 bg-sky-blue border-1 border-sky-blue mt-10 rounded-md text-white font-fp font-normal text-sm px-12 py-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {loading && (
            <div className="flex justify-center mt-3">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </form>
    </Header>
  );
};

export default ForgotPassword;
