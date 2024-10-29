import { WithTooltip } from '@/components/archive/ui/with-tooltip';
import { Check, Copy } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useChatApiProvider } from '../chat-api-provider';

export const MESSAGE_ICON_SIZE = 18;

interface MessageActionsProps {
  isAssistant: boolean;
  isLast: boolean;
  isEditing: boolean;
  isHovering: boolean;
  onCopy: () => void;
  onEdit: () => void;
  onRegenerate: () => void;
}

export const MessageActions: FC<MessageActionsProps> = ({
  isLast,
  isEditing,
  isHovering,
  onCopy,
}) => {
  const { isGenerating } = useChatApiProvider();

  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleCopy = () => {
    onCopy();
    setShowCheckmark(true);
  };

  useEffect(() => {
    if (showCheckmark) {
      const timer = setTimeout(() => {
        setShowCheckmark(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showCheckmark]);

  return (isLast && isGenerating.current) || isEditing ? null : (
    <div className="text-muted-foreground flex items-center space-x-2">
      {/* {!isAssistant && isHovering && ( // TODO edit last message button
        <WithTooltip
          delayDuration={1000}
          side="bottom"
          display={<div>Edit</div>}
          trigger={
            <Pencil
              className="cursor-pointer hover:opacity-50"
              size={MESSAGE_ICON_SIZE}
              onClick={onEdit}
            />
          }
        />
      )} */}

      {(isHovering || isLast) && (
        <WithTooltip
          delayDuration={1000}
          side="bottom"
          display={<div>Copy</div>}
          trigger={
            showCheckmark ? (
              <Check size={MESSAGE_ICON_SIZE} />
            ) : (
              <Copy
                className="cursor-pointer hover:opacity-50"
                size={MESSAGE_ICON_SIZE}
                onClick={handleCopy}
              />
            )
          }
        />
      )}

      {/* {isLast && ( // TODO regenerate button
        <WithTooltip
          delayDuration={1000}
          side="bottom"
          display={<div>Regenerate</div>}
          trigger={
            <Repeat
              className="cursor-pointer hover:opacity-50"
              size={MESSAGE_ICON_SIZE}
              onClick={onRegenerate}
            />
          }
        />
      )} */}

      {/* {1 > 0 && isAssistant && <MessageReplies />} */}
    </div>
  );
};
