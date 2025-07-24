import { useChat } from "../../../context/ChatDataContext";
import ChatList from "../components/ChatList";

export default function ChatLists() {
  const { results } = useChat();

  return (
    <div className="flex flex-col container shadow-lg p-4">
      <h2 className="text-xl p-4 font-semibold">Chat List</h2>
      {/* Chat List */}
      {results.map((result) => (
        <ChatList key={result.room.id} chat={result} />
      ))}
    </div>
  );
}
