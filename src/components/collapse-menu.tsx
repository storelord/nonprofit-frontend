import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface CollapsibleMenuProps {
  title: string;
  children: React.ReactNode;
  onTitleClick?: () => void;
}

export const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({
  title,
  children,
  onTitleClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between text-sm leading-[1.45] font-medium mb-3 gap-3">
        <span
          className="text-[0.815rem] leading-[1.45] text-[#344054] font-normal line-clamp-2 hover:cursor-pointer"
          onClick={onTitleClick}
        >
          {title}
        </span>
        <div className="hover:cursor-pointer hover:bg-slate-200 rounded-full p-0.5">
          {!isOpen ? (
            <ChevronDown
              size={16}
              color="#000000"
              className=""
              onClick={() => setIsOpen(true)}
            />
          ) : (
            <ChevronUp
              size={16}
              color="#000000"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>
      <motion.div
        className="flex flex-col gap-y-1"
        style={{ overflow: 'hidden' }}
        initial={{ height: 0, opacity: 1 }}
        animate={{
          transition: { type: 'tween', duration: 0.2 },
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0.5,
          marginBottom: isOpen ? '0.75rem' : 0,
        }}
        exit={{ height: 0, opacity: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
