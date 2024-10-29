import { useEffect, useState } from 'react';

type ImageWithFallbackProps = {
  fallback?: HTMLImageElement['src'];
  src?: HTMLImageElement['src'];
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

const ImageWithFallback = ({
  fallback = '/vite.svg',
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <img
      alt={alt}
      onError={(e) => setError(e)}
      src={error ? fallback : (src ?? '')}
      {...props}
    />
  );
};

export default ImageWithFallback;
