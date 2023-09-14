"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import locationIcon from "@../../public/Images/location-icon.png";
import Modal from "@/@components/Modal";
import { GetPostedJobsMutation } from "@/api/get-posted-jobs";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/UseTest";
import { useRouter } from "next/navigation";

const PostedJobsCard: React.FC = () => {
  const { userRole } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [jobId, setJobId] = useState<null | string>(null);
  const router = useRouter();

  useEffect(() => {
    if (userRole === "1") {
      router.push("/jobs/applied-jobs");
    }
  }, [userRole, router]);

  const { data, isLoading, error } = useQuery(
    ["postedJobs"],
    GetPostedJobsMutation
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const openModal = (jobId: string) => {
    setShowModal(true);
    setJobId(jobId);
  };

  const closeModal = () => {
    setShowModal(false);
    setJobId(null);
  };

  return (
    <>
      <div className="flex flex-wrap mt-8 justify-start">
        {data &&
          data.data.map((job: any) => (
            <div
              key={job.id}
              className="p-4 w-80 mx-2 my-1 rounded-md shadow-custom bg-white flex-col font-fp "
            >
              <p className="text-primary truncate text-base mb-3">
                {job.title}
              </p>
              <div className="text-xs truncate break-words  text-primary/80 mb-5 h-20">
                {job.description}
              </div>
              <div className="flex justify-between">
                <div className="flex item-center truncate">
                  <Image
                    className="h-4 w-4 mr-2 mt-1"
                    src={locationIcon}
                    alt="location"
                  />
                  <p className="text-xs w-4/5 text-primary/80 truncate break-words">
                    {job.location}
                  </p>
                </div>

                <button
                  className="bg-button-back px-4 py-2 text-primary text-[12px] rounded-md"
                  onClick={() => openModal(job.id)}
                >
                  View Applications
                </button>
              </div>
            </div>
          ))}
      </div>
      {jobId && showModal && (
        <Modal
          isModalShown={showModal}
          onModalClose={closeModal}
          jobId={jobId}
        />
      )}
    </>
  );
};

export default PostedJobsCard;
