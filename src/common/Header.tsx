"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/UseTest";
import tooltip from "@../../public/Images/tool-tip.png";
import ButtonSecondary from "@/@components/ButtonSecondary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

function Header({ children }: { children: React.ReactNode }) {
  const { userRole, userToken, userName } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Explicitly specify the type
  const router = useRouter();
  const path = usePathname().split("/");

  const currentRoute = path[path.length - 1];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");

    setShowDropdown(false);
    toast.success("Logged Out Successfully");
    router.push("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen h-full bg-back-blue relative">
      <div className="w-full absolute top-0 h-[50vh] bg-gradient-to-r from-primary to-secondary"></div>
      <div className="z-10 relative flex-col justify-between w-full">
        <div className="px-6 md:px-16">
          <div className="flex py-4 md:py-2 border-b border-gray-100 dark:border-hr-color justify-between items-center">
            <Link href="/">
              <div className="text-2xl md:text-xl font-bold text-white font-fp">
                My<span className="text-sky-blue">Jobs </span>
              </div>
            </Link>
            {userToken ? (
              <div className="text-white text-sm cursor-pointer flex items-center space-x-4">
                {userRole === "0" ? (
                  <Link
                    className="font-fp text-xs hover:underline"
                    href="/post-job"
                  >
                    Post A Job
                  </Link>
                ) : (
                  <Link
                    className="font-fp text-xs hover:underline"
                    href="/jobs/applied-jobs"
                  >
                    Applied Jobs
                  </Link>
                )}

                <div
                  className="relative inline-flex items-center"
                  ref={dropdownRef}
                >
                  <div className="flex justify-between"> 
                     <div
                    className="rounded-full inline-flex items-center justify-center h-10 w-10 bg-back-blue text-primary cursor-pointer"
                    onClick={toggleDropdown}
                    >
                    <div className="text-xl">
                      {userName?.charAt(0).toUpperCase()}
                    </div>
                    </div>
                    <div onClick={toggleDropdown}>
                    <Image src={tooltip} alt="tooltip" className="w-3 h-3 rotate-90 mt-3 ml-1"/>
                    </div>
                  </div>

                  {showDropdown && (
                    <div className="absolute top-12 right-0 mt-2 bg-white p-2 rounded shadow">
                      <button
                        className="text-primary text-sm cursor-pointer block"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : currentRoute === "login" || currentRoute === "signup" ? (
              ""
            ) : (
              <ButtonSecondary />
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Header;
