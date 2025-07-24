import type { Participant } from "../../../types/participant";
import type { Comment } from "../../../types/comment";

export default function ChatBubble({
  message,
  sender,
  isUserMessage,
  isSequence,
  type = "text",
}: {
  message: string;
  sender: Participant["id"];
  isUserMessage: boolean;
  isSequence?: boolean;
  type?: Comment["type"];
}) {
  const fileName = (url: string) => {
    if (!url || !url.includes("/")) return "Unknown";
    return url.split("/").pop()?.split("?")[0];
  };

  const avatar = (sender: string) => {
    return `https://ui-avatars.com/api/?name=${sender}&rounded=true&background=ffffff`;
  };

  function renderMessageContent() {
    switch (type) {
      case "image":
        return (
          <img
            src={message}
            alt="sent image"
            className="max-w-full rounded-lg border"
          />
        );
      case "video":
        return (
          <video
            src={message}
            controls
            className="max-w-full rounded-lg border"
          />
        );
      case "pdf":
        return (
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl">📄</div>
              <div>
                <h3 className="font-medium text-gray-900">PDF Document</h3>
                <div className="text-sm text-gray-500">
                  {message.includes("/") && (
                    <div>File: {fileName(message)}</div>
                  )}
                  <div>Type: application/pdf</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <a
                href={message}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Open PDF
              </a>

              <a
                href={message}
                download={
                  message.includes("/") ? fileName(message) : "document.pdf"
                }
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-sm"
              >
                Save As...
              </a>

              <button
                onClick={() => {
                  const pdfWindow = window.open();
                  pdfWindow!.document.write(`
                      <iframe 
                        src="${message}" 
                        width="100%" 
                        height="100%" 
                        style="border:none;">
                      </iframe>
                    `);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-sm"
              >
                Open in Viewer
              </button>
            </div>
          </div>
        );
      case "text":
      default:
        return <p className="py-2.5 text-sm font-normal">{message}</p>;
    }
  }

  return (
    <div
      className={`flex items-start gap-2.5 ${
        isUserMessage ? "justify-end" : "justify-start"
      }
      ${isSequence ? "ms-10" : ""}`}
    >
      {!isUserMessage && !isSequence && (
        <img
          className="h-8 w-8 rounded-full border border-green-100"
          src={avatar(sender)}
          alt="Sender avatar"
        />
      )}

      <div
        className={`flex max-w-[320px] flex-col leading-1.5 rounded-xl border border-gray-200
        ${
          isUserMessage
            ? `bg-green-500 text-white ${!isSequence ? "rounded-br-none" : ""}`
            : `bg-gray-100 text-gray-900 ${
                !isSequence ? "rounded-bl-none" : ""
              }`
        }
        ${type === "text" ? "p-4" : "p-0.5"}`}
      >
        {!isUserMessage && !isSequence && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold">{sender}</span>
          </div>
        )}

        <div>{renderMessageContent()}</div>
      </div>
    </div>
  );
}
