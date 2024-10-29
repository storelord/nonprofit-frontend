// reference: https://github.com/mckaywrigley/chatbot-ui/blob/main/package.json
import React, { FC } from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MessageMarkdownMemoized } from "./message-markdown-memoized";

interface MessageMarkdownProps {
  content: string;
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ content }) => {
  return (
    <MessageMarkdownMemoized
      className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words"
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold mb-2">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc pl-5 mb-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 mb-2">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        img: ({ node, ...props }) => <img className="max-w-[67%]" {...props} />,
        code: ({ node, className, children, ...props }) => {
          const childArray = React.Children.toArray(children);
          const firstChild = childArray[0] as React.ReactElement;
          const firstChildAsString = React.isValidElement(firstChild)
            ? (firstChild as React.ReactElement).props.children
            : firstChild;

          if (firstChildAsString === "▍") {
            return <span className="mt-1 animate-pulse cursor-default">▍</span>;
          }

          if (typeof firstChildAsString === "string") {
            childArray[0] = firstChildAsString.replace("`▍`", "▍");
          }

          if (
            typeof firstChildAsString === "string" &&
            !firstChildAsString.includes("\n")
          ) {
            return (
              <code
                className={`bg-gray-100 dark:bg-gray-800 rounded px-1 ${className}`}
                {...props}
              >
                {childArray}
              </code>
            );
          }

          return (
            <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto">
              <code className={className} {...props}>
                {childArray}
              </code>
            </pre>
          );
        },
      }}
    >
      {content}
    </MessageMarkdownMemoized>
  );
};
