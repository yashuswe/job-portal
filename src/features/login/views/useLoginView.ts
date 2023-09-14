"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginMutation } from "@/api/login";
import { useRouter } from "next/navigation";

export const useLoginView = () => {
  const routing = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(""); // State to track email validation error
  const [passwordError, setPasswordError] = useState(""); // State to track password validation error

  // Define a function to handle form submission
  const handleFormSubmit = (e: any) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the email is valid
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Clear any previous email error

      // Check if the password is less than 6 characters
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long.");
      } else {
        setPasswordError(""); // Clear any previous password error
        handleSubmit();
      }
    }
  };

  // Helper function to validate email
  const isValidEmail = (email: string) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await loginMutationFn.mutateAsync({ email, password });
      if (response && response.data) {
        toast.success("Login successful!");
        response.data.userRole === 1
          ? routing.push("/jobs?page=1")
          : routing.push("posted-jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginMutationFn = useMutation({
    mutationFn: LoginMutation,
    onError: (error: any) => {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.response.data.errors) {
          const errorMessages = error.response.data.errors.map(
            (error: any) => Object.values(error)[0]
          );
          toast.error(errorMessages.join("\n"));
        } else {
          toast.error("An error occurred.");
        }
      } else {
        toast.error("An error occurred.");
      }
    },
  });

  return {
    email,
    password,
    isLoading,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleFormSubmit, // Rename the function to handleFormSubmit
  };
};
