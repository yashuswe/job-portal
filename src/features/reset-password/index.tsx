"use client";
import Input from "@/@components/Input";
import Link from "next/link";
import Header from "@/common/Header";
import { useResetPasswordView } from "./views/useResetPasswordView";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = ({ token }: { token: string }) => {
  const router = useRouter();
  const {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    handleCPasswordChange,
    handleResetPassword,
    handlePasswordChange,
  } = useResetPasswordView({ token });
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleResetPassword(e);
  };
  return (
    <Header>
      <form onSubmit={handleResetPassword}>
        <div
          className={`bg-white mx-auto w-min mt-32 p-7 rounded-2xl flex-col
        text-primary shadow-3xl`}
        >
          <h1 className="text-xl mb-5 font-medium">Reset Your Password</h1>
          <Input
            name="password"
            value={password}
            type="password"
            label="New Password"
            onChange={handlePasswordChange}
            placeholder="Enter password"
          />
          {passwordError && (
            <div className="text-red-500 text-sm mt-2">{passwordError}</div>
          )}
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            placeholder="Enter password"
            onChange={handleCPasswordChange}
          />
          {confirmPasswordError && (
            <div className="text-red-500 text-sm mt-2">
              {confirmPasswordError}
            </div>
          )}
          <div className="flex justify-center">
            <Link href="/login">
              <button
                onClick={handleClick}
                className="text-white text-xs font-medium font-fp w-11/12 h-auto px-12 py-2 bg-sky-blue border-1 border-sky-blue rounded-md"
              >
                Reset
              </button>
            </Link>
          </div>
        </div>
      </form>
    </Header>
  );
};

export default ResetPassword;
