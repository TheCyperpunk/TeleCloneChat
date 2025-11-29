import { ChatSidebar } from "../layout/ChatSidebar";

const mockChats = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey! Are you coming tonight?",
    timestamp: "2:34 PM",
    unreadCount: 3,
    isOnline: true,
    lastMessageStatus: "delivered" as const,
  },
  {
    id: "2",
    name: "Team Project",
    lastMessage: "Sarah: The presentation is ready",
    timestamp: "1:15 PM",
    unreadCount: 12,
    isGroup: true,
    isTyping: true,
  },
  {
    id: "3",
    name: "Bob Smith",
    lastMessage: "Thanks for your help!",
    timestamp: "Yesterday",
    isOnline: false,
    lastMessageStatus: "read" as const,
  },
];

const mockStories = [
  { id: "s1", userId: "u2", userName: "Alice Johnson", isViewed: false },
  { id: "s2", userId: "u3", userName: "Bob Smith", isViewed: true },
];

export default function ChatSidebarExample() {
  return (
    <div className="h-[600px]">
      <ChatSidebar
        chats={mockChats}
        stories={mockStories}
        currentUserId="u1"
        currentUserName="You"
        hasOwnStory={false}
        selectedChatId="3"
        onChatSelect={(id) => console.log("Chat selected:", id)}
        onStoryClick={(userId) => console.log("Story clicked:", userId)}
        onAddStory={() => console.log("Add story")}
        onNewChat={() => console.log("New chat")}
        onSettings={() => console.log("Settings")}
      />
    </div>
  );
}
