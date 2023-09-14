"use client"
import Header from "@/common/Header";
import Image from "next/image";
import homeIcon from "@../../public/Images/house-solid.svg";
import PostedJobsCard from "./PostedJobs";
import  Link  from "next/link";
const page = () => {
  return (
      <Header>
        <div className="px-16 flexx-col justify-between">
        <div className="flex mt-2 items-center">
          <Link href={"/"}>
            <Image className="w-5 h-6 mr-2 invert" src={homeIcon} alt="Image" />
          </Link>
          <Link href={"/"}>
            <span className="font-fp text-xs text-white/80 hover:underline">Home</span>
          </Link>
          <span className="text-white text-lg ml-2">&gt;</span>
          <span className="text-white/80 text-xs text-fp ml-1">
          Posted Jobs
        </span>
          </div>
          <h1 className="mt-6 text-white text-lg mb-5 ">Jobs posted by you</h1>
          <div className="flex flex-wrap">
        <PostedJobsCard/>
          </div>
        </div>
      </Header>

  );
};

export default page;
