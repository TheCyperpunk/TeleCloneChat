import { ChatWindow } from "../layout/ChatWindow";

const mockMessages = [
  {
    id: "1",
    content: "Hey there! How are you doing?",
    timestamp: "2:30 PM",
    isOwn: false,
    senderName: "Alice",
  },
  {
    id: "2",
    content: "I'm doing great, thanks for asking!",
    timestamp: "2:31 PM",
    isOwn: true,
    status: "read" as const,
  },
  {
    id: "3",
    content: "Just finished working on that project we discussed.",
    timestamp: "2:31 PM",
    isOwn: true,
    status: "read" as const,
  },
  {
    id: "4",
    content: "That's awesome! Can't wait to see it.",
    timestamp: "2:32 PM",
    isOwn: false,
    senderName: "Alice",
  },
];

export default function ChatWindowExample() {
  return (
    <div className="h-[600px] w-full max-w-2xl">
      <ChatWindow
        chat={{
          id: "1",
          name: "Alice Johnson",
          isOnline: true,
        }}
        messages={mockMessages}
        onSendMessage={(content) => console.log("Send:", content)}
        onProfileClick={() => console.log("Profile clicked")}
      />
    </div>
  );
}
