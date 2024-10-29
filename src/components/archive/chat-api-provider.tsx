import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useToast } from '@/hooks/archive/use-toast';
import { AIResponse, ChatMessage, ChatRequest } from "@/types";
import { uid } from "@/lib/utils";
import { debounce } from "lodash";

// Get the WebSocket URL from the environment variable
const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

if (!WEBSOCKET_URL) {
  throw new Error("VITE_WEBSOCKET_URL environment variable is not set");
}

interface WebSocketContextType {
  sendMessage: (message: string) => void;
  messageHistory: ChatMessage[];
  editingMessage: ChatMessage | undefined;
  isGenerating: React.MutableRefObject<boolean>;
  firstTokenReceived: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setEditingMessage: React.Dispatch<
    React.SetStateAction<ChatMessage | undefined>
  >;
  readyState: ReadyState;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

export const useChatApiProvider = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useChatApiProvider must be used within a ChatApiProvider");
  }
  return context;
};

interface ChatApiProviderProps {
  children: ReactNode;
}

export const ChatApiProvider: React.FC<ChatApiProviderProps> = ({
  children,
}) => {
  const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);
  const isGenerating = useRef(false);
  const [input, setInput] = useState("");
  const [firstTokenReceived, setFirstTokenReceived] = useState(false);
  const currentMessageRef = useRef<string>("");
  const [editingMessage, setEditingMessage] = useState<ChatMessage | undefined>(
    undefined,
  );
  const { toast } = useToast();

  const {
    sendMessage: sendWebSocketMessage,
    lastMessage,
    readyState,
  } = useWebSocket(WEBSOCKET_URL);

  /**
   * Responds to new data on the socket
   */
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const res: AIResponse = JSON.parse(lastMessage.data);
        handleWebSocketMessage(res);
      } catch (error) {
        console.error("Error parsing message:", error);
        toast({
          title: "Error",
          description: "Error parsing message from server",
        });
      }
    }
  }, [lastMessage]);

  /**
   * Handles each type of message on the socket
   * @param res json message from the backend
   */
  const handleWebSocketMessage = (res: AIResponse): void => {
    switch (res?.type) {
      case "content":
        handleContentMessage(res.data);
        break;
      case "summary":
        handleSummaryMessage(res.data);
        break;
      case "error":
        handleErrorMessage(res.data);
        break;
      default:
        console.warn("Unknown message type:", res);
    }
  };

  const handleContentMessage = (content: string) => {
    setFirstTokenReceived(true);
    currentMessageRef.current += content;
    updateMessageHistory();
  };

  /**
   * Handles the summary payload, which has the entire message one more time
   * Also marks the end of the generation
   * @param summary All the content
   */
  const handleSummaryMessage = (summary: string) => {
    currentMessageRef.current = summary;
    setFirstTokenReceived(false);
    isGenerating.current = false;
    updateMessageHistory();
  };

  const handleErrorMessage = (errorMessage: string) => {
    console.error("Error from server:", errorMessage);
    isGenerating.current = false;
    toast({
      title: "Error",
      description: errorMessage,
    });
  };

  const updateMessageHistory = useCallback(
    debounce(() => {
      setMessageHistory((prev) => {
        const newHistory = [...prev];
        const lastMessage = newHistory[newHistory.length - 1];
        if (lastMessage && lastMessage.role === "assistant") {
          lastMessage.message = currentMessageRef.current;
        } else {
          newHistory.push({
            id: uid(),
            message: currentMessageRef.current,
            role: "assistant",
            date: new Date(),
          });
        }
        return newHistory;
      });

      // Clear currentMessageRef only if generation has finished
      if (!isGenerating.current) {
        currentMessageRef.current = "";
      }
    }, 300),
    [],
  );

  const sendMessage = (message: string) => {
    if (readyState === ReadyState.OPEN) {
      isGenerating.current = true;
      setMessageHistory((prev) => [
        ...prev,
        { id: uid(), message: message, role: "user", date: new Date() },
      ]);
      // the backend expects a formatted json body
      const req: ChatRequest = {
        message,
        history: messageHistory ? messageHistory : null,
      };
      sendWebSocketMessage(JSON.stringify(req));
      setInput("");
    } else {
      toast({
        title: "Cannot connect with server.",
        description: "Try refreshing.",
      });
      console.error(
        `Cannot sent message because the websocket it not open: Url: ${WEBSOCKET_URL}, state: ${readyState}`,
      );
    }
  };

  const value = {
    sendMessage,
    messageHistory,
    isGenerating,
    firstTokenReceived,
    editingMessage,
    input,
    setInput,
    setEditingMessage,
    readyState,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
