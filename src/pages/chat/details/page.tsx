import ChatInput from "../components/ChatInput";
import ChatContainer from "../components/ChatContainer";
import ChatHeader from "../components/ChatHeader";
import { useChat } from "../../../context/ChatDataContext";

export default function ChatDetail() {
  const { currentChat } = useChat();
  return (
    <main className="flex flex-col container shadow-lg">
      {/* Header */}
      <ChatHeader currentChat={currentChat} />
      {/* Chat Messages */}
      <ChatContainer currentChat={currentChat} />
      {/* Input Area */}
      <ChatInput currentChat={currentChat} />
    </main>
  );
}
