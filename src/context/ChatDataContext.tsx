import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import data from "../data/data.json";
import type { ChatResult } from "../types/chatResult";

interface ChatDataContextType {
  results: ChatResult[];
  setResults: (results: ChatResult[]) => void;
  currentChat: ChatResult | null;
  setCurrentChat: (chat: ChatResult) => void;
  getLastChat: (roomId: number) => ChatResult["comments"][0] | undefined;
  clearChat: () => void;
}

const ChatContext = createContext<ChatDataContextType | undefined>(undefined);

export const ChatDataProvider = ({ children }: { children: ReactNode }) => {
  const [results, _setResults] = useState<ChatResult[]>([]);
  const [currentChat, _setCurrentChat] = useState<ChatResult | null>(null);

  const setResults = (results: ChatResult[]) => {
    _setResults(results);
  };

  const setCurrentChat = (chat: ChatResult) => {
    console.log("Setting current chat to:", chat);
    _setCurrentChat(chat);
  };

  const getLastChat = (
    roomId: number
  ): ChatResult["comments"][0] | undefined => {
    const room = results.find((r) => r.room.id === roomId);
    return room?.comments[room.comments.length - 1];
  };

  const clearChat = () => {
    _setCurrentChat(null);
  };

  const initializeChat = () => {
    _setResults(data.results as ChatResult[]);
  };

  useEffect(() => {
    initializeChat();
    console.log("Current chat changed to:", currentChat);
  }, [currentChat]);

  const value = useMemo(
    () => ({
      results,
      setResults,
      currentChat,
      setCurrentChat,
      clearChat,
      getLastChat,
    }),
    [results, currentChat]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatDataContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatDataProvider");
  }
  return context;
};
