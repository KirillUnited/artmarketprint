"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

import {
  DEFAULT_PRODUCT_IMAGE,
  getBlurPlaceholderProps,
  getImageLqip,
  resolveImageSrc,
  shouldBypassNextImageOptimization,
} from "@/lib/image-utils";

type OptimizedImageSrc = ImageProps["src"] | unknown;

type OptimizedImageProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & {
  src: OptimizedImageSrc;
  lqip?: string | null;
  fallbackSrc?: string;
};

export function OptimizedImage({
  src,
  lqip,
  fallbackSrc = DEFAULT_PRODUCT_IMAGE,
  alt,
  unoptimized,
  ...props
}: OptimizedImageProps) {
  const resolvedSrc = resolveImageSrc(src, fallbackSrc);
  const blurLqip = lqip ?? getImageLqip(src);
  const blurProps = getBlurPlaceholderProps(blurLqip);
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
  }, [resolvedSrc]);

  const imageSrc = currentSrc || fallbackSrc;
  const bypassOptimization =
    unoptimized ?? shouldBypassNextImageOptimization(imageSrc);

  return (
    <Image
      {...props}
      {...blurProps}
      alt={alt}
      src={imageSrc}
      unoptimized={bypassOptimization}
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
