export interface ChatMessage {
  id: string;
  message: string;
  role: "assistant" | "user";
  date: Date;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[] | null;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

interface AIResponseContent {
  type: "content";
  data: string;
}

interface AIResponseSummary {
  type: "summary";
  data: string;
}

interface AIResponseError {
  type: "error";
  data: string;
}

export type AIResponse =
  | AIResponseContent
  | AIResponseSummary
  | AIResponseError;
