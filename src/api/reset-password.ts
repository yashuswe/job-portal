"use client";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export const resetPasswordMutation = async (resetData: {
  password: string;
  confirmPassword: string;
  token: string;
}) => {
  try {
    const token = localStorage.getItem("userToken"); 
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token; 
      }
    const response = await axiosInstance.post("/auth/resetpassword", resetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export function useResetPasswordMutation() {
  const queryClient = useQueryClient();
  return useMutation(resetPasswordMutation, {});
}
