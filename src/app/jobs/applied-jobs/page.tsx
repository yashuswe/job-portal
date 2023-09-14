"use client";
import Header from "@/common/Header";
import Image from "next/image";
import homeIcon from "@../../public/Images/house-solid.svg";
import jobIcon from "@../../public/Images/edit.png"
import { GetAppliedJobs } from "@/api/get-applied-jobs";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/UseTest";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/@components/Card";
import Pagination from "@/@components/Pagination";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { userRole } = useAuth();
  const[appliedJobs, setAppliedJobs] = useState([]);

  const handlePageChange = (page:any) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    if (userRole === "0") router.push("/posted-jobs");
    fetchAppliedJobs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole, currentPage]);



  const fetchAppliedJobs = async () => {
    try {
      setIsLoading(true);
      const response = await GetAppliedJobs(currentPage);
      setAppliedJobs(response.data);
      // setCount(response.metadata.count); 
      // setLimit(response.metadata.limit); 
      // setTotalPages(Math.ceil(response.metadata.count / response.metadata.limit));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      setIsLoading(false);
    }
  };
  

  return (
    <Header>

      <div className="px-16 flexx-col justify-between">
        <div className="flex mt-2 items-center px-16">
          <Link href={"/"}>
            <Image className="w-5 h-6 mr-2 invert" src={homeIcon} alt="Image" />
          </Link>
          <Link href={"/"}>
            <span className="font-fp text-xs text-white/80 hover:underline">Home</span>
          </Link>
          <span className="text-white text-lg ml-2">&gt;</span>
          <Link href={"/jobs?page=1"}>
          <span className="text-white/80 text-xs text-fp ml-1 hover:underline">
          Jobs
        </span>
        </Link>
        <span className="text-white text-lg ml-2">&gt;</span>
          <span className="font-fp text-white/80 text-xs ml-2">Applied Jobs</span>
        </div>
        <div className="mt-6 px-16 text-white text-lg mb-5">
          Jobs applied by you
        </div>
        <div className="pl-16 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-9">
          {isLoading ? (
            <div className="text-white text-center w-full">Loading...</div>
          ) : appliedJobs?.length === 0 ? (
            <div>
            <div className="flex justify-center items-center py-64 mx-auto">
            <div className="text-primary text-center w-full justify-center items-center">
              <Image src={jobIcon} alt=""/>
              You have not applied for any jobs yet. <br />
              <Link className="text-fp text-primary text-lg" href={"/jobs"}>
                Apply For A Job
              </Link>
            </div>
            </div>
           </div>
          ) : (
            appliedJobs?.map((job: any) => (
              <Card job={job} isAppliedJob key={job.id} />
            ))
          )}
        </div>
      </div>
<div className="mt-10 mb-20">
        </div>
    </Header>
  );
};

export default Page;
