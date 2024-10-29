import BellIcon from '@/assets/icons/BellIcon';
import HeadSetIcon from '@/assets/icons/HeadSetIcon';
import PaperClipIcon from '@/assets/icons/PaperClipIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import SignOutIcon from '@/assets/icons/SignOutIcon';
import Avatar from '@/components/avatar';
import Breadcrumbs from '@/components/breadcrumbs';
import { CollapsibleMenu } from '@/components/collapse-menu';
import Input from '@/components/input';
import UserProfile from '@/components/user-profile';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { cn } from '@/lib/utils';
import { setUser } from '@/store/slices/auth.slice';
import { StatementOption } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fakeUser = {
  id: 1,
  name: 'John Doe',
  email: 'email@email.com',
  image:
    'https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function ChatPage() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [selectedConversation, setConversation] = useState<string | null>(null);

  const { data: statementHistory } = useQuery({
    queryKey: ['statement-history'],
    queryFn: async () => {
      const response = await axios.get<StatementOption[]>(
        '/data/statement-history.json'
      );
      if (!selectedConversation) {
        setConversation(
          `${response.data[0].id}-${response.data[0].grants[0].id}`
        );
      }
      return response.data;
    },
  });

  const onSignIn = () => {
    dispatch(setUser(fakeUser));
  };

  const onSignOut = () => {
    dispatch(setUser(null));
  };

  const onSubmitAdjustMissionStatement = () => {
    const value = (
      document.getElementById('mission-statement-input') as HTMLInputElement
    )?.value?.trim();
    if (!value) return;
    const params = new URLSearchParams();
    params.append('mission', value);
    navigate(`/?${params.toString()}`);
  };

  const currentStatement = statementHistory?.find(
    (history) => history.id === selectedConversation?.split('-')[0]
  );
  const currentGrant = currentStatement?.grants.find(
    (grant) => grant.id === selectedConversation?.split('-')[1]
  );

  return (
    <div className="flex w-full h-screen bg-[#F1F1F1]">
      <div className="side-bar h-full max-w-[17.75rem] w-full bg-[#F1F1F1] pt-1.5 pb-6 pr-2.5 flex flex-col justify-between 0 max-md:hidden">
        <div className="px-[0.625rem] py-2 mt-[0.875rem] max-h-[80%]">
          <Input
            id="mission-statement-input"
            icon={<SearchIcon />}
            placeholder="Adjust your mission statement"
            classNames={{
              root: 'h-[2.625rem]',
              input: 'text-xs leading-[1.45]',
            }}
            onKeyDown={(e) =>
              e.key === 'Enter' && onSubmitAdjustMissionStatement()
            }
          />
          <div
            className="mt-5 flex flex-col gap-y-5 overflow-y-auto flex-1 h-[calc(100%-56px)] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {statementHistory?.map((history) => (
              <CollapsibleMenu
                title={history.statement}
                key={history.id}
                onTitleClick={() => {
                  const params = new URLSearchParams();
                  params.append('mission', history.statement);
                  navigate(`/?${params.toString()}`);
                }}
              >
                {history.grants.map((grant) => (
                  <div
                    className={cn(
                      'py-3 px-2 hover:cursor-pointer h-fit flex',
                      selectedConversation === `${history.id}-${grant.id}`
                        ? 'bg-white rounded-xl'
                        : ''
                    )}
                    key={grant.id}
                    onClick={() => setConversation(`${history.id}-${grant.id}`)}
                  >
                    <span className="text-[#101928] text-sm leading-[1.45] font-semibold">
                      {grant.name}
                    </span>
                  </div>
                ))}
              </CollapsibleMenu>
            ))}
          </div>
        </div>
        <div className="bottom-menu flex flex-col gap-y-[0.5rem]">
          <div className="action-group flex flex-col px-2 pb-3 ">
            <div className="flex px-4 py-3 gap-3 items-center text-sm leading-[1.45] font-medium hover:cursor-pointer">
              <SettingIcon />
              Settings
            </div>
            <div className="flex px-4 py-3 gap-3 items-center text-sm leading-[1.45] font-medium hover:cursor-pointer">
              <HeadSetIcon />
              Help Center
            </div>
          </div>
          {user && (
            <UserProfile
              user={user}
              action={{
                onClick: onSignOut,
                icon: <SignOutIcon color="#DC2828" />,
              }}
            />
          )}
        </div>
      </div>
      <div className="chat-frame flex-1 rounded-l-3xl bg-[#FDFDFD] my-1 mr-1">
        <div className="top-bar flex justify-between items-center py-[0.85rem] px-5 border-b border-[rgba(0,0,0,0.1)]">
          <h1 className="text-2xl leading-none tracking-[-0.04em] font-bold">
            Day1 AI
          </h1>
          <div className="flex gap-x-3">
            <button className="p-[0.625rem] border-none bg-[#F0F2F5] rounded-full">
              <BellIcon color="#DC2828" className="size-5" />
            </button>
            {user ? (
              <Avatar src={user.image} />
            ) : (
              <button
                className="bg-primary text-white rounded-full py-1.5 !border-none !outline-none !ring-0"
                onClick={onSignIn}
              >
                Login
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col h-[90%] w-full">
          <div className="message-box px-5 flex-1">
            {currentStatement && currentGrant && (
              <div className="conversion-header mt-[1.875rem]">
                <Breadcrumbs
                  classNames={{
                    root: 'max-md:flex-col max-md:items-start max-md:gap-y-1',
                  }}
                  items={[
                    { name: currentStatement?.statement },
                    {
                      name: currentGrant?.name,
                    },
                  ]}
                />
                <h1 className="font-medium text-2xl leading-[1.2] mt-[1.875rem]">
                  {currentGrant?.name}
                </h1>
              </div>
            )}
          </div>
          <div className="chat-box flex justify-center w-full mb-[2.875rem]">
            <Input
              placeholder="Type your message here..."
              icon={<PaperClipIcon color="#000000" className="mx-2.5" />}
              classNames={{
                root: ' md:w-[55rem] flex-shrink shadow-[0px_16px_16px_0px_#0000000A] px-2 py-3 max-sm:mx-3 mx-8 w-full',
                input:
                  'text-base leading-[1.575rem] sm:ml-4 flex-shrink w-full',
              }}
              trailing={
                <div className="flex justify-center items-center h-full">
                  <button className="bg-primary flex items-center justify-center py-[0.6875rem] px-5 rounded-full border-none">
                    <ArrowRightIcon size={24} color="#FFFFFF" />
                  </button>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}