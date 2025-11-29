import { ChatHeader } from "../chat/ChatHeader";

export default function ChatHeaderExample() {
  return (
    <div className="w-full max-w-2xl">
      <ChatHeader
        name="Alice Johnson"
        isOnline
        onProfileClick={() => console.log("Profile clicked")}
        onSearchClick={() => console.log("Search clicked")}
      />
    </div>
  );
}
