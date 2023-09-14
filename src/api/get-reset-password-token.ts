import axiosInstance from "@/instances/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export const getResetPasswordToken = async (email:string) => {
    try{
      const token = localStorage.getItem("userToken"); 
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token; 
      }
        const response = await axiosInstance.get(`/auth/resetpassword?email=${email}`)
        return(
            response.data
        )
    }
    catch(error)
    {
        throw error;
    }
}

export const verifyTokenMutation = async (token: string) => {
    try {
      const response = await axiosInstance.get(`/auth/resetpassword/${token}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export function useVerifyTokenMutation() {
    return useMutation(verifyTokenMutation);
  }




