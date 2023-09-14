"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ApplyForAJob } from "@/api/apply-for-a-job";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { GetJobs } from "@/api/get-jobs";
import { useAuth } from "@/hooks/UseTest";
import { useRouter } from "next/navigation";
import Pagination from "@/@components/Pagination";
import { GetAppliedJobs } from "@/api/get-applied-jobs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

export const useApplyForAJob = () => {
  const pagesToShow = 3;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { userRole } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [data, setAllJobs] = useState<string[]>([]);

  // useEffect(() => {
  //   if (userRole === "0") router.push("/posted-jobs");
  //   // fetchAppliedJobs(currentPage);
  //   fetchAllJobs(currentPage)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userRole, currentPage]);
  const params = useSearchParams();
  useEffect(() => {
    let page = params.get("page");
    if (!page) page = "1";
    setCurrentPage(Number(page));
  }, [params]);
  const queryClient = useQueryClient();

  const fetchAppliedJobs = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await GetAppliedJobs(currentPage);
      // setAppliedJobs(response.data);
      setTotalPages(response.data.metadata.count);
      console.log("PAGE COUNT", response.data.metadata.count);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      setIsLoading(false);
    }
  };

  const { data: allJobs, isLoading: isLoadingJob } = useQuery(
    ["jobs", currentPage],
    GetJobs,
    {
      enabled: userRole === "1",
      retry: false,
    }
  );

  useEffect(() => {
    if (allJobs) {
      // console.log(allJobs, "allJobs");
      setTotalPages(+allJobs?.metadata?.count / +allJobs?.metadata?.limit);
    }
    if (userRole === "0") router.push("/posted-jobs");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allJobs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const { data: data ,refetch} = GetJobs(currentPage.toString());
  // const setPagination = (total: number | undefined) => {
  //   console.log("entered set pagination");
  //   if (total) {
  //     console.log("total= > ", total);
  //     setTotalPages(Math.floor(total / perPage));
  //     console.log("pagesss= > ", totalPages);
  //   }
  // };

  // const startIdx = (currentPage - 1) * jobsPerPage;
  // const endIdx = currentPage * jobsPerPage;
  // const visibleJobs = data?.slice(startIdx, endIdx);

  const [apply, setApply] = useState(false);

  const ApplyForAJobFn = useMutation({
    mutationFn: ApplyForAJob,
    onSuccess: () => {
      toast.success("Applied for the Job Sucessfully!!");
      queryClient.invalidateQueries(["jobs"]);

      // fetchAllJobs(currentPage);
    },
    onError: () => {
      toast.error("Could not apply for this job");
    },
  });
  const handleApplyForAJob = (jobId: string) => {
    setApply(true);
    ApplyForAJobFn.mutate(jobId);
    // setAppliedJobs([...appliedJobs, jobId]);
  };

  return {
    totalPages,
    pagesToShow,
    currentPage,
    allJobs: allJobs?.data ?? [],
    data,
    apply,
    // appliedJobs,
    isLoading,
    isLoadingJob,
    isPageLoading,
    handlePageChange,
    handleApplyForAJob,
  };
};

export default useApplyForAJob;
