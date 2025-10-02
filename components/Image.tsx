"use client";

import NextImage from "next/image";
import { Image as IKImage } from "@imagekit/next";
import { ComponentProps } from "react";

type IKImageProps = ComponentProps<typeof IKImage>;

interface OlyImageProps extends Omit<IKImageProps, "src"> {
  src: string | null | undefined;
}

const Image = ({ src, transformation, ...props }: OlyImageProps) => {
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!src) {
    return null;
  }

  if (!endpoint) {
    // If endpoint not set, treat all as external
    return <NextImage src={src} {...props} />;
  }

  const isImageKitUrl = src.startsWith(endpoint);
  const finalSrc = isImageKitUrl ? src.replace(endpoint, "") : src;

  if (isImageKitUrl) {
    return <IKImage src={finalSrc} transformation={transformation} {...props} />;
  } else {
    // Use Next.js Image for external URLs
    return <NextImage src={finalSrc} {...props} />;
  }
};

export default Image;
