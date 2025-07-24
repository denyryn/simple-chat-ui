import { useChatView } from "../../context/ChatViewContext";
import ChatLists from "./list/page";
import ChatDetailPage from "./details/page";
import { useEffect } from "react";

export default function ChatPage() {
  const { currentView } = useChatView();

  useEffect(() => {
    document.title = "Chat";
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full flex-1 gap-4">
      {/* Left Panel - Chat List */}
      <div
        className={`
          ${currentView === "detail" ? "hidden" : "block"}
          lg:block
          lg:w-1/3
          border-r border-gray-200
        `}
      >
        <ChatLists />
      </div>

      {/* Right Panel - Chat Detail */}
      <div
        className={`
          ${currentView === "list" ? "hidden" : "block"}
          lg:block
          lg:w-2/3
        `}
      >
        <ChatDetailPage />
      </div>
    </div>
  );
}
