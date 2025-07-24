import { useRef, useEffect } from "react";
import Send from "@assets/send.svg";
import Attachment from "@assets/attachment.svg";

export default function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, []);

  return (
    <footer className="px-4 py-3 bg-white border-t border-gray-200 rounded-b-xl">
      <div className="flex items-center">
        <button className="p-4">
          <img className="size-6" src={Attachment} alt="Attach" />
        </button>
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Type a message..."
          onInput={handleInput}
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
          className="flex-1 resize-none overflow-scroll px-3 py-2 rounded-lg placeholder-gray-500
                     focus:ring-0 focus:outline-none border-none shadow-none max-h-[80px] text-sm text-black"
        />
        <button className="p-4">
          <img className="size-6" src={Send} alt="Send" />
        </button>
      </div>
    </footer>
  );
}
