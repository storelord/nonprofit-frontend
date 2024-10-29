import { User } from '@/store/slices/auth.slice';
import Avatar from './avatar';

type UserProfileProps = {
  user: User;
  action: {
    onClick: () => void;
    icon: React.ReactNode;
  };
};

export default function UserProfile({ user, action }: UserProfileProps) {
  return (
    <div className="user-menu h-20 flex justify-between items-center px-6 py-3">
      <div className="flex gap-x-3">
        <Avatar src={user.image} />
        <div className="flex flex-col">
          <span className="text-sm leading-[1.45] font-medium">
            {user.name}
          </span>
          <span className="text-sm leading-[1.45] text-[#00000066] font-normal">
            {user.email}
          </span>
        </div>
      </div>
      <button
        className="bg-transparent px-0 !border-none !outline-none !ring-0"
        onClick={action.onClick}
      >
        {action.icon}
      </button>
    </div>
  );
}
