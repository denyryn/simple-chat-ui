import type { ChatResult } from "../../../types/chatResult";
import { useChatView } from "../../../context/ChatViewContext";
import BackArrow from "../../../assets/arrow_back.svg";

export default function ChatHeader({
  currentChat,
}: {
  currentChat: ChatResult | null;
}) {
  const { clearSelection } = useChatView();
  const participants = currentChat?.room.participant || [];

  return (
    <header className="flex items-center justify-between z-10 px-6 py-4 shadow-md rounded-t-xl bg-white">
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <button className="block lg:hidden" onClick={clearSelection}>
          <img
            className="size-6 shrink-0"
            src={BackArrow}
            alt="Back"
            aria-label="Back to chat list"
          />
        </button>

        {/* Product Image */}
        <img
          className="md:size-14 size-10 rounded-full shrink-0"
          src={currentChat?.room.image_url}
          alt={currentChat?.room.name || "Product Image"}
          aria-label={currentChat?.room.name || "Product Image"}
          loading="lazy"
        />

        <div>
          {/* Room Name */}
          <h1 className="text-base font-semibold text-black">
            {currentChat?.room.name}
          </h1>

          {/* Participants */}
          <span className="text-xs text-gray-600 line-clamp-1">
            {participants.map((p) => p.name).join(", ") || "No participants"}
          </span>
        </div>
      </div>

      {/* Participants */}
      <div className="hidden md:flex items-center -space-x-3 *:size-10 *:border *:border-green-100">
        {currentChat?.room.participant.map((participant) => (
          <img
            className="rounded-full"
            key={participant.id}
            src={`https://ui-avatars.com/api/?name=${participant.name}&rounded=true&background=ffffff`}
            alt={participant.name}
            aria-label={participant.name}
            title={participant.name}
          />
        ))}
      </div>
    </header>
  );
}
