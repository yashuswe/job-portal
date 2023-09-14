import axiosInstance from "@/instances/axiosInstance";

export const GetPostedJobsMutation = async () => {
  try {
    const token = localStorage.getItem("userToken"); 
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token; 
      }
    const response = await axiosInstance.get("/recruiters/jobs");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

