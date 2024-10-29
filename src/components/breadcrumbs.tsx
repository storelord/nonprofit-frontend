import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbsProps = {
  items: { name: string }[];
  classNames?: {
    root?: string;
  };
};

export default function Breadcrumbs({ items, classNames }: BreadcrumbsProps) {
  return (
    <div
      className={cn(
        'breadcrumbs flex gap-x-0.5 items-center',
        classNames?.root
      )}
    >
      {items.slice(0, items.length - 1).map((item) => (
        <div className="flex gap-x-0.5 items-center">
          <span className="text-black text-sm leading-6 font-medium">
            {item.name}
          </span>
          <ChevronRight size={20} color="#A1A1AA" />
        </div>
      ))}
      <span className="text-[#00000066] text-sm leading-6 font-medium">
        {items[items.length - 1].name}
      </span>
    </div>
  );
}
