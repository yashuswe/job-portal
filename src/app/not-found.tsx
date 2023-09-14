import Header from "@/common/Header";
import React from "react";

const page = () => {
  return (
    <Header>
      <div className="flex justify-center items-center py-40">
        <h1 className=" text-white text-3xl ">
            Sorry! This page could not be found (Status Code: 404)
        </h1>
      </div>
    </Header>
  );
};

export default page;
