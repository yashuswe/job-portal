import axiosInstance from "@/instances/axiosInstance";

export const getOneJobCandidates = async (jobId:string) => {
    try {
      
        const token = localStorage.getItem("userToken"); 
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token; 
      }
        const response = await axiosInstance.get(`/recruiters/jobs/${jobId}/candidates`);
        return response.data.data;
      } catch (error) {
        throw error;
      }
 
}