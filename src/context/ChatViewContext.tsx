import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useChat } from "./ChatDataContext";

type ChatView = "list" | "detail";

interface ChatViewContextType {
  currentView: ChatView;
  setCurrentView: (view: ChatView) => void;
  selectedChatId: number | null;
  selectChat: (chatId: number) => void;
  clearSelection: () => void;
}

const ChatViewContext = createContext<ChatViewContextType | undefined>(
  undefined
);

export function ChatViewProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ChatView>("list");
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const { results, setCurrentChat } = useChat();

  const selectChat = (id: number) => {
    const chat = results.find((r) => r.room.id === id);
    if (chat) setCurrentChat(chat);
    setSelectedChatId(id);
    setCurrentView("detail");
  };

  const clearSelection = () => {
    setSelectedChatId(null);
    setCurrentView("list");
  };

  return (
    <ChatViewContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedChatId,
        selectChat,
        clearSelection,
      }}
    >
      {children}
    </ChatViewContext.Provider>
  );
}

export const useChatView = () => {
  const context = useContext(ChatViewContext);
  if (!context) {
    throw new Error("useChatView must be used within ChatViewProvider");
  }
  return context;
};
