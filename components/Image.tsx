"use client";

import NextImage from "next/image";
import { Image as IKImage } from "@imagekit/next";
import { ComponentProps } from "react";

type IKImageProps = ComponentProps<typeof IKImage>;

interface OlyImageProps extends Omit<IKImageProps, "src"> {
  // src: string | null | undefined;
  src: string | { url(): string } | null | undefined;
}

const Image = ({ src, transformation, ...props }: OlyImageProps) => {
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!src) {
    return null;
  }

  // Convert Sanity image builder to string if needed
  let srcString: string;
  if (typeof src === 'string') {
    srcString = src;
  } else {
    try {
      srcString = src.url();
    } catch {
      return null;
    }
  }
  
  if (!srcString) {
    return null;
  }

  if (!endpoint) {
    return <NextImage src={srcString} {...props} />;
  }

  const isImageKitUrl = srcString.startsWith(endpoint);
  const finalSrc = isImageKitUrl ? srcString.replace(endpoint, "") : srcString;

  if (isImageKitUrl) {
    return <IKImage src={finalSrc} transformation={transformation} {...props} />;
  } else {
    return <NextImage src={finalSrc} {...props} />;
  }
};


export default Image;
