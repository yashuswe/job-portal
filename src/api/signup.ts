"use client";
import axiosInstance from "@/instances/axiosInstance";

interface SignupData {
  name: string;
  email: string;
  password: string;
  skills: string;
  userRole:number
  confirmPassword:string
}

export const signupMutation = async (data: SignupData) => {
  try {
    
    const response = await axiosInstance.post("/auth/register", data);
    localStorage.setItem("userRole",response.data.data.userRole);
    localStorage.setItem("userToken",response.data.data.token);
    localStorage.setItem("userName",response.data.data.name);
    return response.data;
  } catch (error) {
    throw error;
  }
};
