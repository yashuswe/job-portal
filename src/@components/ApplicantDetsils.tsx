// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getOneJobCandidates } from '@/api/get-job-candidates';

import { PropsWithChildren } from "react";

// const Card = ({
//     name,
//     email,
//     skills,
//   }: {
//     name: string;
//     email: string;
//     skills: string;
//   }) => {
//     const firstLetter = name.charAt(0).toUpperCase();
//     return (
//       <div className="border flex-col p-3 mb-2 bg-white w-64 rounded-sm text-primary border-primary border-opacity-80">
//         <div className="flex justify-around">
//           <div className="rounded-full bg-light-blue text-lg w-12 h-12 flex justify-center items-center ">
//             <div>{firstLetter}</div>
//           </div>
//           <div className="pl-2 flex-col align-middle justify-around">
//             <div className=" text-xl text-opacity-60 mb-1">{name}</div>
//             <div className="text-xs text-opacity-80">{email}</div>
//           </div>
//         </div>
//         <div className="mt-2 text-lg mb-2">Skills</div>
//         <div className="text-opacity-80 text-xs">{skills}</div>
//       </div>
//     );
//   };

//   type Candidate = {
//     id: string;
//     name: string;
//     email: string;
//     skills: string;
//   };

// type ApplicantDetailsProps = {
//   jobId: string;
// };

// const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({ jobId }) => {
//   const { data: candidates, isLoading, error } = useQuery(['jobCandidates', jobId], () =>
//     getOneJobCandidates(jobId)
//   );

//   if (isLoading) {
//     return <div>Loading candidates...</div>;
//   }

//   if (error) {
//     return <div>Error fetching candidate data</div>;
//   }

//   if (!candidates || candidates.length === 0) {
//     return <div>No candidates have applied for this job yet.</div>;
//   }

//   return (
//     <div>
//        {candidates &&
//                 candidates.map((candidate: Candidate) => (
//                   <Card
//                     key={candidate.id}
//                     name={candidate.name}
//                     email={candidate.email}
//                     skills={candidate.skills}
//                   />
//                 ))}
//     </div>
//   );
// };

// export default ApplicantDetails;
// "use client";
// import React, { useEffect, useRef } from "react";
// import notepad from "@../../public/Images/img7.png"
// import Image from "next/image";
// import Modal from "./Modal";

// export function ModalCard({ curr }: { curr: any }) {
//   return (
//     <div className="w-full h-full overflow-hidden">
//       <div className="rounded-md border-2 border-bordercolor min-h-full shadow-card p-3 w-full bg-white">
//         <div className="flex gap-x-5 items-center">
//           <div className="px-4 py-3 rounded-3xl bg-[#D9EFFF] text-xl">
//             {curr.name[0]?.toString().toUpperCase()}
//           </div>
//           <div className="flex flex-col gap-y-2">
//             <p className="font-medium text-base">{curr.name}</p>
//             <p className="text-primary2/80">{curr.email}</p>
//           </div>
//         </div>
//         <div className="mt-6 ">
//           <p className="font-medium">Skills</p>
//           <p className="text-primary2/80">{curr.skills}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ApplicantsModal({
//   isModalOpen,
//   setModalOpen,
//   data,
//   isFetching,
// }: {
//   isModalOpen: boolean;
//   setModalOpen: (val: boolean) => void;
//   data: any;
//   isFetching: boolean;
// }) {
//   // bodyRef to stop background scroll while modalRef is to close modal on outside click.
//   const bodyRef = useRef(document.querySelector("body"));
//   const modalRef = useRef<any>();

//   useEffect(() => {
//     const checkIfClickedOutside = (e: any) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         setModalOpen(false);
//       }
//     };
//     document.addEventListener("click", checkIfClickedOutside);
//     return () => {
//       document.removeEventListener("click", checkIfClickedOutside);
//     };
//   }, [setModalOpen]);

//   useEffect(() => {
//     if (isModalOpen) {
//       bodyRef.current!.style.overflow = "hidden";
//     }
//     return () => {
//       bodyRef.current!.style.overflow = "visible";
//     };
//   }, [isModalOpen]);

//   if (isModalOpen === false) {
//     return null;
//   }

//   return (
//     <Modal >
//       <div className="fixed h-screen w-screen bg-black/80 z-20 inset-0">
//         <div className="h-screen w-screen text-primary2 font-fp flex justify-center items-center">
//           <div
//             ref={modalRef}
//             className="w-10/12 md:w-65 lg:w-55 h-5/6 bg-white text-primary2 font-fp p-7 mt-7 shadow-card rounded-3xl"
//           >
//             <div className="flex justify-between">
//               <p className="text-xl w-8/12">Applicants for this job</p>
//               <button onClick={() => setModalOpen(false)} className="">
//                 x
//               </button>
//             </div>

//             <div className="border-1 border-bordercolor mt-5"></div>

//             <p className="mt-3">
//               Total {`${data?.length ? data?.length : "0"}`} applications
//             </p>

//             <div className="bg-modal-bg/30 p-3 h-78 md:h-5/6 max-h-5/6 rounded-md overflow-scroll mt-2 mb-2]">
//               {isFetching ? (
//                 <>
//                   <div className="flex justify-center items-center w-full min-h-full">
//                     <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="h-full w-full">
//                   {data !== undefined && data?.length !== 0 ? (
//                     <div className="w-full h-auto pb-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
//                       {data.map((curr: any) => (
//                         <div key={curr} className="w-auto min-h-full">
//                           <ModalCard curr={curr} />
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <>
//                       <div className="w-full h-full flex flex-col gap-y-5 justify-center items-center">
//                         <Image
//                           src={notepad}
//                           alt="no applicants"
//                           width={150}
//                           height={150}
//                         />
//                         <p className="font-fp text-primary2 text-xl">
//                           No applications available!
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }
// import { ModalCard } from "./ModalCard";
// import { useQuery } from "@tanstack/react-query";
// import { getOneJobCandidates } from "@/api/get-job-candidates";
// interface ApplicantDetailsProps {
//   id: string;
//   name: string;
//   email: string;
//   skills: string;
// }

// export const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({
//   id,
//   name,
//   email,
//   skills,
// }) => {
//   const {
//     data: candidates,
//     isLoading,
//     error,
//   } = useQuery(["jobCandidates", jobId], () => getOneJobCandidates(jobId));
//   return <div></div>;
// };
