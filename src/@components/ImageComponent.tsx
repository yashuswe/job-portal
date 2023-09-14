import Image, { ImageProps } from "next/image";

interface ImageComponentProps {
  src: ImageProps["src"];
  alt: string;
  width?: number;
  height?: number;
}

const ImageComponent = ({ src, alt, width, height }: ImageComponentProps) => {
  return <Image className={`h-${height} w-${width}`} src={src} alt={alt} />;
};

export default ImageComponent;
