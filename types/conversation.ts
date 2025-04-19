export interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}
