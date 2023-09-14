"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useRef } from "react";
import { getOneJobCandidates } from "@/api/get-job-candidates";
import { useQuery } from "@tanstack/react-query";
import { ModalCard } from "./ModalCard";

type TModalBody = {
  isModalShown: boolean;
  onModalClose: () => void;
  jobId: string;
};

const Modal = ({ isModalShown, onModalClose, jobId }: TModalBody) => {
  type Candidate = {
    id: string;
    name: string;
    email: string;
    skills: string;
  };

  const {
    data: candidates,
    isLoading,
    error,
  } = useQuery(["jobCandidates", jobId], () => getOneJobCandidates(jobId));
  const element = useRef<HTMLElement>();
  function getPortal() {
    const portal =
      typeof document !== "undefined"
        ? document.getElementById("modal-root")
        : null;
    if (portal) element.current = portal;
  }
  useEffect(() => {
    getPortal();
  }, []);

  if (!element.current) {
    return null;
  } else if (isModalShown) {
    return ReactDOM.createPortal(
      <>
        <div
          className="fixed z-20 left-0 right-0 bottom-0 top-0 bg-primary opacity-50"
          onClick={onModalClose}
        ></div>
        <div className="z-30 fixed w-1/2 mx-80 bg-white rounded-2xl pl-8 pr-8 mt-12 font-fp text-primary">
          <div className="flex justify-between  items-center">
            <div className="text-2xl py-4">Applicants for this job</div>
            <button onClick={onModalClose}>
              <div className="font-bold text-2xl">x</div>
            </button>
          </div>
          <hr className="h-0.5 border-0 bg-gray-3 mt-5 mb-3" />
          <div className="font-sm mb-3">
            Total {candidates ? candidates.length : 0} applications
          </div>

          <div className="bg-gray-3 border-2 overflow-y-scroll xl:px-2 xl:py-2 md:py-3 md:px-1 h-[550px] w-auto mb-10 rounded-lg">
            <div className="grid grid-cols-2 gap-x-4">
              {isLoading && <div>Loading candidates...</div>}
              {error && <div>Error fetching candidate data</div>}
              {candidates && candidates.length === 0 && (
                <div className="text-center text-opacity-80">
                  No candidates have applied for this job yet.
                </div>
              )}
              {candidates &&
                candidates.map((candidate: Candidate) => (
                  <ModalCard
                    key={candidate.id}
                    name={candidate.name}
                    email={candidate.email}
                    skills={candidate.skills}
                  />
                ))}
            </div>
          </div>
        </div>
      </>,
      document.getElementById("modal-root") as HTMLElement
    );
  }
};

export default Modal;
