import { QueryFunctionContext } from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";

export const GetJobs = async (query: QueryFunctionContext<(string | number)[], any>, page?: string) => {
  try {
    const currentPage = query.queryKey[1];
    const token = localStorage.getItem("userToken");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = token;
    }
    const response = await axiosInstance.get(`/candidates/jobs`, {
      params: { page: currentPage },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
