import { cn } from '@/lib/utils';
import ImageWithFallback from './image-with-fallback';

type AvatarProps = React.ComponentProps<typeof ImageWithFallback>;

export default function Avatar({ className, ...rest }: AvatarProps) {
  return (
    <ImageWithFallback
      className={cn(
        'size-10 ring-1.5 ring-white object-cover rounded-full',
        className
      )}
      {...rest}
    />
  );
}
