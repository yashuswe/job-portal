// "use client";
import axiosInstance from "@/instances/axiosInstance";

export const ApplyForAJob = async (jobId:string) => {
    try {
      const token = localStorage.getItem("userToken"); 
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token; 
      }
      const response = await axiosInstance.post("/candidates/jobs" ,{jobId} );
      return response.data;
    } catch (error) {
      throw error;
    }
  };