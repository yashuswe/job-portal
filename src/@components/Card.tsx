import React from "react";
import locationIcon from "@../../public/Images/location-icon.png";
import Image from "next/image";

interface CardProps {
  job: any;
  isAppliedJob: boolean;
  onClick?: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ job, onClick, isAppliedJob }) => {
  return (
    <div className="p-4 rounded-md shadow-custom bg-white flex-col font-fp">
      <p className="text-primary truncate text-base mb-3">{job.title}</p>
      <div className="text-xs text-primary/80 mb-5 h-20 break-words overflow-hidden">
        {job.description}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <Image
            className="h-4 w-4 mr-2 mt-1"
            src={locationIcon}
            alt="location"
          />
          <p className="text-xs w-4/5 text-primary/80 truncate break-words">
            {job.location}
          </p>
        </div>
        {onClick && !isAppliedJob && (
          <button
            className="bg-button-back px-4 py-2 text-primary text-[12px] rounded-md"
            onClick={() => onClick(job.id)}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
