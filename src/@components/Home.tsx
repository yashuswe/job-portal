"use client";
import Image from "next/image";
import bgPicture from "@../../public/Images/bg-image.jpg";
import { MouseEvent } from "react";
import LogoGrid from "./LogoGrid";
import Header from "@/common/Header";
import Logo1 from "../../public../../public/Images/solaytic.png";
import Logo2 from "@../../public/Images/img7.png";
import Logo3 from "@../../public/Images/Meta-Logo.png";
import Logo4 from "@../../public/Images/ztos.png";
import Logo5 from "@../../public/Images/GOLDLINE-LOGO-mini.png";
import Logo6 from "@../../public/Images/img3.png";
import Logo7 from "@../../public/Images/solaytic.png";
import Logo8 from "@../../public/Images/GOLDLINE-LOGO-mini.png";
import Logo9 from "@../../public/Images/solaytic.png";
import { useAuth } from "@/hooks/UseTest";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const router = useRouter();
  const { userToken } = useAuth();
  const handleGetStarted = (e: MouseEvent<HTMLButtonElement>) => {
    if (userToken) {
      if (userToken === "0") {
        router.push("/posted-jobs");
      } else {
        router.push("/jobs?page=1");
      }
    } else {
      router.push("/signup");
    }
  };
  const logos = [
    { src: Logo1, alt: "Image" },
    { src: Logo2, alt: "Image" },
    { src: Logo3, alt: "Image" },
    { src: Logo4, alt: "Image" },
    { src: Logo5, alt: "Image" },
    { src: Logo6, alt: "Image" },
    { src: Logo7, alt: "Image" },
    { src: Logo8, alt: "Image" },
    { src: Logo9, alt: "Image" },
  ];
  return (
    <div>
      <Header>
        <div className="flex-col font-fp text-primary">
          <div className="flex justify-between">
            <div className="xl:pl-36 md:pl-28">
              <div className="flex-col justify-between md:mt-14 text-white font-fp">
                <div className="text-4xl mt-20">
                  Welcome to <br />
                  <div className="text-white">
                    My<span className="text-sky-blue">Jobs</span>
                  </div>
                </div>
                <button
                  onClick={handleGetStarted}
                  className="bg-sky-blue text-white font-fp xl:text-[14px] md:text-[12px] px-6 rounded-sm py-2"
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="py-16 md:px-20 ">
              <Image
                className="rounded-xl shadow-lg h-96 w-full"
                src={bgPicture}
                alt="Image"
              />
            </div>
          </div>
          <div className="xl:px-36 lg:px-32 xl:text-xl md:text-lg xl:mb-5">
            Why Us
          </div>
          <div className="flex justify-between pl-32 pr-20 py-3">
            <div className="bg-white xl:mb-10 p-5 mx-auto shadow-md w-11/12 mr-5">
              <div className="text-lg text-sky-blue">
                Get More <br />
                Visibility
              </div>
              <div className="text-xs pt-4  pr-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </div>
            </div>
            <div className="bg-white xl:mb-10 p-5 mx-auto shadow-md w-full mr-5">
              <div className="text-lg text-sky-blue">
                Organize Your <br />
                Candidates
              </div>
              <div className="text-xs pt-4  pr-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </div>
            </div>
            <div className="bg-white xl:mb-10 p-5 mx-auto shadow-md w-full">
              <div className="text-lg text-sky-blue">
                Verify Their <br />
                Abilities
              </div>
              <div className="text-xs pt-4  pr-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </div>
            </div>
          </div>
          <div className="pr-20 pl-36 text-xl py-4">Companies Who Trust Us</div>
        </div>
      </Header>
      <div className="bg-back-blue">
        <div className="py-6 pl-36 pr-20">
          <LogoGrid logos={logos} />
        </div>
      </div>
    </div>
  );
};

export default Home;
