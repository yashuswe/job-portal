"use client";
import React from "react";
import Link from "next/link";

const ButtonSecondary = () => {
  return (
    <button className=" text-white text-xs text-center font-fp border-sky-blue border opacity-1 rounded space-x-0 bg-button-back py-2 px-6">
      <Link className="hover:underline" href="/login">
        Login
      </Link>
      /
      <Link className="hover:underline" href="/signup">
        Signup
      </Link>
    </button>
  );
};

export default ButtonSecondary;
