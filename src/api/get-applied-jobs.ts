import axiosInstance from "@/instances/axiosInstance";

export const GetAppliedJobs = async (currentPage: number) => {
    try {

      const token = localStorage.getItem("userToken"); 
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token; 
      }
      
          const response = await axiosInstance.get(`/candidates/jobs/applied?page=${currentPage}`);
          return response.data;
        } catch (error) {
          throw error;
        }
 
}