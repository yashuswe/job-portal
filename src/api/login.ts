"use client";
import axiosInstance from "@/instances/axiosInstance";

export const LoginMutation = async (credentials:{email:string, password:string}) => {
      try {
        const token = localStorage.getItem("userToken"); 
        if (token) {
          axiosInstance.defaults.headers.common["Authorization"] = token; 
        }
        const response = await axiosInstance.post("/auth/login", credentials);
        if (response)
        {

          localStorage.setItem("userRole",response.data.data.userRole);
          localStorage.setItem("userToken",response.data.data.token);
          localStorage.setItem("userName",response.data.data.name);
        }
        return response.data;
      } catch (error) {
        throw error;
      }
    }



