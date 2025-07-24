import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import type { ChatResult } from "../../../types/chatResult";
import type { Comment } from "../../../types/comment";
import { useUserData } from "../../../context/UserDataContext";

export default function ChatContainer({
  currentChat,
}: {
  currentChat: ChatResult | null;
}) {
  const { currentUser } = useUserData();
  const containerRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }

  const sender = (comment: Comment) => {
    return (
      currentChat?.room.participant.find((p) => p.id === comment.sender)
        ?.name || "Unknown"
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  if (!currentChat) {
    return (
      <section className="flex-1 overflow-y-auto px-4 py-6">
        <p className="text-gray-500">No chat selected.</p>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
    >
      {currentChat.comments.map((comment, index, comments) => {
        const isUserMessage = comment.sender === currentUser?.id;

        const previous = comments[index - 1];
        const isSequence = previous && previous.sender === comment.sender;

        return (
          <ChatBubble
            key={comment.id}
            message={comment.message}
            sender={sender(comment)}
            type={comment.type}
            isUserMessage={isUserMessage}
            isSequence={!!isSequence}
          />
        );
      })}
    </section>
  );
}
