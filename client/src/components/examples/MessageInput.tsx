import { MessageInput } from "../chat/MessageInput";

export default function MessageInputExample() {
  return (
    <div className="w-full max-w-2xl">
      <MessageInput
        onSend={(message) => console.log("Sent:", message)}
        onTyping={(isTyping) => console.log("Typing:", isTyping)}
      />
    </div>
  );
}
