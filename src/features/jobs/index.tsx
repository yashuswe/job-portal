import React from "react";
import Header from "@/common/Header";
import Image from "next/image";
import homeIcon from "@../../public/Images/house-solid.svg";
import Pagination from "@/@components/Pagination";
import { useApplyForAJob } from "./views/useApplyForAJob";
import Link from "next/link";
import Card from "@/@components/Card";

const ApplyForAJob = () => {
  const {
    totalPages,
    pagesToShow,
    currentPage,
    data,
    // appliedJobs,
    isLoading,
    isPageLoading,
    allJobs,
    isLoadingJob,
    handlePageChange,
    handleApplyForAJob,
  } = useApplyForAJob();
  // console.log("data =", data);
  // console.log(totalPages,"totalPages")
  return (
    <Header>
      <div className="flex-col justify-around mx-20">
        <div className="flex mt-2 items-center">
          <Link href={"/"}>
            <Image className="w-4 h-6 mr-2 invert" src={homeIcon} alt="Image" />
          </Link>
          <Link href={"/"}>
            <div className="font-fp text-xs opacity-80 text-white font-medium hover:underline">
              Home
            </div>
          </Link>
          <span className="text-white text-lg text-fp ml-1">&gt;</span>
          <span className="text-white/80 text-xs text-fp ml-1">Jobs</span>
        </div>
        <div className="mt-6 text-white text-lg mb-5 font-medium">
          Jobs for you
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
          {isLoadingJob ? (
            <p className="text-white text-lg mt-8">Loading...</p>
          ) : allJobs?.length === 0 ? (
            <div className="text-white text-lg mt-8">No jobs available.</div>
          ) : (
            allJobs.map((job: any) => (
              <div key={job.id}>
                <Card
                  job={job}
                  onClick={() => handleApplyForAJob(job.id)}
                  isAppliedJob={false}
                />
              </div>
            ))
          )}
        </div>
        {allJobs && (
          <div className="flex justify-center">
            <div className="mx-auto py-16">
              <Pagination
                count={Math.ceil(totalPages)}
                limit={20}
                currentPage={currentPage}
                pushTo="jobs"
              />
            </div>
          </div>
        )}
      </div>
    </Header>
  );
};

export default ApplyForAJob;
