"use client";
import { MouseEventHandler } from "react";
interface ButtonPrimaryProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: number;
  disabled?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ text, onClick, width, disabled }) => {
  const widthClass = `w-${width}`;
  return (
    <button
      className={`bg-sky-blue text-white font-fp md:px-6 
      xl:px-10 md:py-1 md:w-32 xl:w-48 md:my-4 xl:py-3 xl:my-9 
      md:text-xs xl:text-sm rounded-lg ${widthClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default ButtonPrimary;
