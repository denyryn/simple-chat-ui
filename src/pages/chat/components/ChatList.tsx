import type { ChatResult } from "../../../types/chatResult";
import { useChatView } from "../../../context/ChatViewContext";
import { useChat } from "../../../context/ChatDataContext";

export default function ChatList({ chat }: { chat: ChatResult }) {
  const { selectChat } = useChatView();
  const { getLastChat } = useChat();

  return (
    <button
      key={chat.room.id}
      onClick={() => selectChat(chat.room.id)}
      className="m-1 hover:bg-green-200 rounded-xl transition-colors duration-200"
    >
      <div key={chat.room.id} className="p-4 flex items-center space-x-4">
        <img
          className="size-10 rounded-full shrink-0"
          src={chat.room.image_url}
          alt={chat.room.name}
        />
        <div className="flex flex-col items-start">
          <h2 className="text-base font-semibold">{chat.room.name}</h2>
          <p className="text-xs text-gray-700 text-start line-clamp-1">
            {getLastChat(chat.room.id)?.message}
          </p>
        </div>
      </div>
    </button>
  );
}
