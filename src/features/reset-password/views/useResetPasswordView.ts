// "use client";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/api/reset-password";

export const useResetPasswordView = ({ token }: { token: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setCPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleCPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setCPassword(newConfirmPassword);
    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const resetPasswordMutation = useResetPasswordMutation();

  const handleResetPassword = (e: any) => {
    try {
      resetPasswordMutation.mutate({
        password,
        confirmPassword,
        token,
      });
    } catch (error) {
      toast.error("An error occurred while resetting password.");
    }
  };

  return {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    handleCPasswordChange,
    handlePasswordChange,
    handleResetPassword,
  };
};
