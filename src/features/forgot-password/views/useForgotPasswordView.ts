import { useState } from "react";
import { ChangeEvent } from "react";
import { getResetPasswordToken } from "@/api/get-reset-password-token";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useVerifyTokenMutation } from "@/api/get-reset-password-token";

export const useForgotPasswordView = () => {
  const router = useRouter();
  const verifyPasswordTokenMutation = useVerifyTokenMutation();
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear the previous error message
  };

  const getResetPasswordTokenFn = useMutation({
    mutationFn: getResetPasswordToken,
    onSuccess: (response) => {
      console.log(response?.success);
      if (response?.success) {
        verifyPasswordTokenMutation.mutate(response?.data.token);
        router.push(`/reset-password/${response?.data.token}`);
      } else {
        toast.error("Failed to get reset password token.");
      }
    },
    onError: (error: any) => {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while getting reset password token.");
        }
      } else {
        toast.error("An error occurred while getting reset password token.");
      }
    },
  });

  const isValidEmail = (email: string) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email cannot be empty.");
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setLoading(true);
      try {
        getResetPasswordTokenFn.mutate(email);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    email,
    emailError,
    loading,
    pageLoading,
    handleEmailChange,
    handleSubmit,
  };
};
