import React, { useRef, useEffect } from "react";
import { Button } from "@/components/archive/ui/button";
import { Textarea } from "@/components/archive/ui/textarea";
import { useChatApiProvider } from "./chat-api-provider";
import { ChatMessages } from "./chat/chat-messages";

export default function LandingAiInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, input, setInput, isGenerating } = useChatApiProvider();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating.current) {
      return;
    }
    if (input.trim()) {
      sendMessage(input.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    adjustHeight();
  }, [input]);

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background">
      <div className="flex flex-col w-full max-w-2xl px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary">
          AI Assistant 🤓 for Non-profits
        </h1>
        <div className="flex-grow w-full overflow-y-auto">
          <ChatMessages />
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[2.5rem] max-h-[300px] overflow-y-auto resize-none"
            rows={1}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isGenerating.current}
          >
            Ask
          </Button>
        </form>
      </div>
    </div>
  );
}
