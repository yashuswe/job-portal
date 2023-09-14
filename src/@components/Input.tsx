"use client";
import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea";
  placeholder: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  rows?: number;
  isValid?: boolean;
  className?: string;
  validationText?: string; // Add a prop for custom validation text
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  name,
  required,
  value,
  onChange,
  onBlur,
  rows,
  className,
  isValid = true,
  validationText = "Invalid input",
}) => {
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  const invalidInputClass = !isValid ? "border-red-500" : "";

  return (
    <div
      className={`font-fp text-xs font-normal text-primary mb-2 ${invalidInputClass}`}
    >
      <label htmlFor={name}>
        {label}
        {required && <span className="text-xs">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`mt-2 placeholder-primary placeholder:text-xs p-4 placeholder-opacity-40 md:mb-5 w-[497px] border border-form-gray2 shadow-inner rounded-md  focus:outline-none focus:border-sky-blue bg-form-gray  ${invalidInputClass}`}
          placeholder={placeholder}
          name={name}
          required={required}
          value={value}
          onChange={handleTextAreaChange}
          rows={rows || 4}
          autoComplete="off"
          onBlur={onBlur}
        />
      ) : (
        <input
          className={`mt-2 placeholder-primary placeholder:text-xs p-4 placeholder-opacity-40 md:mb-5 w-[497px] h-[46px] border border-form-gray2 shadow-inner rounded-md  focus:outline-none focus:border-sky-blue bg-form-gray ${invalidInputClass}`}
          type={type}
          placeholder={placeholder}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          autoComplete="off"
          onBlur={onBlur}
        />
      )}
      {!isValid && (
        <div className="text-red-500 text-xs font-fp mt-1">
          {validationText}
        </div>
      )}
    </div>
  );
};

export default Input;
