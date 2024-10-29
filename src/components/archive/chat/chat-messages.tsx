import { FC } from 'react';
import { useChatApiProvider } from '../chat-api-provider';
import { Message } from '@/components/archive/messages/message';

interface ChatMessagesProps {}

export const ChatMessages: FC<ChatMessagesProps> = ({}) => {
  const { messageHistory, editingMessage } = useChatApiProvider();

  return messageHistory
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((msg, index, array) => {
      return (
        <Message
          key={index}
          message={msg}
          isEditing={editingMessage?.id === msg.id}
          isLast={index === array.length - 1}
          //   onStartEdit={setEditingMessage}
          //   onCancelEdit={() => setEditingMessage(undefined)}
          //   onSubmitEdit={handleSendEdit}
        />
      );
    });
};
