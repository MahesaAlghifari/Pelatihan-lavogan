import {
  useEffect,
  useState,
  type ImgHTMLAttributes,
} from "react";

import { cn } from "@/shared/lib/utils/cn";

interface ImageWithFallbackProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src"
  > {
  /**
   * Image source.
   * Supports null from API responses.
   */
  src?: string | null;

  /**
   * Fallback image if src fails to load.
   */
  fallbackSrc?: string;

  /**
   * Show loading skeleton.
   */
  skeleton?: boolean;

  /**
   * Image alt text.
   */
  alt: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/images/image-placeholder.png",
  skeleton = true,
  className,
  onLoad,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState<string>(
    src ?? fallbackSrc
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImageSrc(src ?? fallbackSrc);
    setLoading(true);
  }, [src, fallbackSrc]);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (
    event
  ) => {
    setLoading(false);
    onLoad?.(event);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (
    event
  ) => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      return;
    }

    setLoading(false);
    onError?.(event);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >
      {loading && skeleton && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}

      <img
        {...props}
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}