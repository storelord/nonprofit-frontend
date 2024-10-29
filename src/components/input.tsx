import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  classNames?: {
    root?: string;
    input?: string;
    icon?: string;
  };
  trailing?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, classNames, trailing, ...props }, ref) => {
    return (
      <div
        className={cn(
          'py-2 px-3 rounded-full bg-white flex items-center gap-x-2 shadow-[0px_8px_8px_0px_#0000000A] ring-[#F7F7F8] ring-1',
          classNames?.root
        )}
      >
        {icon && <div className={cn('', classNames?.icon)}>{icon}</div>}
        <input
          type={type}
          className={cn(
            'flex-1 h-full focus-within:ring-0 focus-within:outline-none font-normal bg-transparent',
            className,
            classNames?.input
          )}
          ref={ref}
          {...props}
        />
        {trailing}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
