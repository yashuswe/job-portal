"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GetJobs } from "@/api/get-jobs";
export default function Pagination({
  count,
  limit,
  pushTo,
  currentPage,
  totalPages,
}: {
  count: number;
  limit: number;
  pushTo?: string;
  currentPage?: number;
  totalPages?: number;
}) {
  // console.log(count,"count")
  // console.log(limit,"limit")
  const router = useRouter();
  const handlePageClick = (event: any) => {
    router.push(`/${pushTo}?page=${event.selected + 1}`);
    // GetJobs(currentPage! +1)
  };
  useEffect(() => {
    if (currentPage! > totalPages!) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      currentPage = totalPages;
      router.push(`/${pushTo}?page=${currentPage}`);
    }
  }, [currentPage, totalPages]);
  return (
    <ReactPaginate
      containerClassName="h-10 mt-2 font-fp text-primary2 items-center flex gap-x-2 flex md:gap-x-4"
      activeLinkClassName="border-2 border-sky-blue shadow-card bg-white opacity-100 rounded-md"
      disabledLinkClassName="opacity-20 cursor-not-allowed"
      pageLinkClassName="border-1 border-primary2 px-1 py-1 md:px-3 md:py-2 rounded-md opacity-50"
      pageCount={Math.ceil(count / limit)}
      previousLabel="<"
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      breakLabel=".."
      forcePage={
        currentPage == undefined || currentPage == null ? 1 : currentPage! - 1
      }
    />
  );
}
