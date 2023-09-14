"use client";
import React from "react";
import { IcommonCardProps } from "@/interfaces/ICardCommonProps";

const Card: React.FC<IcommonCardProps> = ({ width, children }) => {
  const widthClass = `w-${width}`;
  return (
    <div
      className={`bg-white mx-auto ${widthClass} mt-20 p-7 rounded-2xl flex-col
    text-primary shadow-3xl`}
    >
      {children}
    </div>
  );
};
export default Card;
