// "use client";
// import axiosInstance from "@/instances/axiosInstance";



// export const PostJob =
//   async (jobData: { title: string; description: string; location: string }) => {
//     try {
//       const response = await axiosInstance.post("/jobs", jobData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
import axiosInstance from "@/instances/axiosInstance";

export const PostJob = async (
  jobData: { title: string; description: string; location: string }
) => {
  try {
    const token = localStorage.getItem("userToken"); 
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token; 
      }
    const response = await axiosInstance.post("/jobs", jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};



