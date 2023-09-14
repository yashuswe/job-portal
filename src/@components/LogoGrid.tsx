import { ImageProps } from "next/image";
import ImageComponent from "./ImageComponent";

interface Logo {
  src: ImageProps["src"];
  alt: string;
  width?: number;
  height?: number;
}

const LogoGrid = ({ logos }: { logos: Logo[] }) => {
  return (
    <div className="bg-back-blue">
      <div className="px-16 ">
        <div className="grid grid-cols-5 gap-x-5 gap-y-2 items-center">
          {logos.slice(0, 5).map((logo, index) => (
            <ImageComponent
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          ))}
        </div>
        <div className="ml-40 grid grid-cols-5 gap-x-5 gap-y-3 items-center mx-4">
          {logos.slice(5, 9).map((logo, index) => (
            <ImageComponent
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoGrid;
