// reference: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/messages/message.tsx
// see for more complex usages like image and file previews
import { cn } from '@/lib/utils';
import { FC, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { TextareaAutosize } from '@/components/archive/ui/textarea-autosize';
// import { MessageActions } from "./message-actions";
import { MessageMarkdown } from './message-markdown';
import { ChatMessage } from '@/types';
import { MessageActions } from './message-actions';

// const ICON_SIZE = 32;

interface MessageProps {
  message: ChatMessage;
  isEditing: boolean;
  isLast: boolean;
  //   onStartEdit: (message: Tables<"messages">) => void
  //   onCancelEdit: () => void
  //   onSubmitEdit: (value: string, sequenceNumber: number) => void
}

export const Message: FC<MessageProps> = ({
  message,
  isEditing,
  isLast,
  //   onStartEdit,
  //   onCancelEdit,
  //   onSubmitEdit
}) => {
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.message);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message.message);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = message.message;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const handleSendEdit = () => {
    console.log('Sumitted editted message. TODO');
    //   onSubmitEdit(editedMessage, message.sequence_number);
    //   onCancelEdit();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isEditing && event.key === 'Enter' && event.metaKey) {
      console.log('Trying to edit. TODO');
      //   handleSendEdit();
    }
  };

  // const handleRegenerate = async () => {
  //     await handleSendMessage(
  //       editedMessage || chatMessages[chatMessages.length - 2].message.content,
  //       chatMessages,
  //       true
  //     );
  // };

  // const handleStartEdit = () => {
  //     onStartEdit(message);
  // };

  useEffect(() => {
    setEditedMessage(message.message);

    if (isEditing && editInputRef.current) {
      const input = editInputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, [isEditing]);

  return (
    <div
      className={cn(
        'flex w-full justify-center rounded-sm',
        message.role === 'user' ? '' : 'bg-secondary'
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="relative flex w-full flex-col p-6 sm:w-[550px] sm:px-0 md:w-[650px] lg:w-[650px] xl:w-[700px]">
        <div className="absolute -right-5 top-7 sm:right-0 mr-4">
          <MessageActions
            onCopy={handleCopy}
            onEdit={() => {}} // TODO
            isAssistant={message.role === 'assistant'}
            isLast={isLast}
            isEditing={isEditing}
            isHovering={isHovering}
            onRegenerate={() => {}} // TODO
          />
        </div>
        <div className="space-y-3 pl-4 pr-12">
          <div className="flex items-center space-x-3">
            {message.role === 'user' && (
              <></>
              // TODO not taking feedback currently
              // <IconMoodSmile
              //   className="bg-primary text-secondary border-primary rounded border-DEFAULT p-1"
              //   size={ICON_SIZE}
              // />
            )}
          </div>
          {isEditing ? (
            <TextareaAutosize
              textareaRef={editInputRef}
              className="text-md"
              value={editedMessage}
              onValueChange={setEditedMessage}
              maxRows={20}
            />
          ) : (
            <MessageMarkdown content={message.message} />
          )}
        </div>

        {isEditing && (
          <div className="mt-4 flex justify-center space-x-2">
            <Button size="sm" onClick={handleSendEdit}>
              Save & Send
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                console.log('cancelling. TODO');
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
