import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatSidebar } from "@/components/layout/ChatSidebar";
import { ChatWindow } from "@/components/layout/ChatWindow";
import { ProfilePanel } from "@/components/layout/ProfilePanel";
import { NewChatDialog } from "@/components/layout/NewChatDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageBubbleProps } from "@/components/chat/MessageBubble";

// todo: remove mock data - replace with real API data
const mockChats = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey! Are you coming to the party tonight?",
    timestamp: "2:34 PM",
    unreadCount: 3,
    isOnline: true,
    lastMessageStatus: "delivered" as const,
    bio: "Software developer. Coffee enthusiast.",
    username: "alice_dev",
    phone: "+1 234 567 8900",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Bob Smith",
    lastMessage: "Thanks for your help with the code review!",
    timestamp: "Yesterday",
    isOnline: false,
    lastMessageStatus: "read" as const,
    bio: "Full-stack developer. Open source contributor.",
    username: "bob_codes",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "Carol White",
    lastMessage: "See you at the meeting tomorrow!",
    timestamp: "Yesterday",
    isOnline: true,
    lastMessageStatus: "read" as const,
    bio: "UX Designer. Cat mom.",
    username: "carol_ux",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    id: "6",
    name: "David Brown",
    lastMessage: "The concert was amazing!",
    timestamp: "Sun",
    isOnline: false,
    lastMessageStatus: "read" as const,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    id: "7",
    name: "Eva Green",
    lastMessage: "Happy birthday!",
    timestamp: "Sat",
    isOnline: true,
    lastMessageStatus: "delivered" as const,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988bababb?w=200&h=200&fit=crop",
  },
];

// todo: remove mock data
const mockGroups = [
  {
    id: "2",
    name: "Team Project",
    lastMessage: "Sarah: The presentation is ready for review",
    timestamp: "1:15 PM",
    unreadCount: 12,
    isGroup: true,
    memberCount: 8,
    avatar: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    name: "Family Group",
    lastMessage: "Mom: Don't forget Sunday dinner!",
    timestamp: "Mon",
    unreadCount: 5,
    isGroup: true,
    memberCount: 6,
    avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop",
  },
  {
    id: "g3",
    name: "College Friends",
    lastMessage: "Jake: Reunion next month?",
    timestamp: "Tue",
    isGroup: true,
    memberCount: 15,
    avatar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
  },
  {
    id: "g4",
    name: "Book Club",
    lastMessage: "Next read: The Great Gatsby",
    timestamp: "Wed",
    isGroup: true,
    memberCount: 8,
    avatar: "https://images.unsplash.com/photo-150784272343-583f20270319?w=200&h=200&fit=crop",
  },
];

// todo: remove mock data
const mockContacts = [
  { id: "1", name: "Alice Johnson", isOnline: true },
  { id: "3", name: "Bob Smith", isOnline: false, lastSeen: "last seen 2h ago" },
  { id: "4", name: "Carol White", isOnline: true },
  { id: "6", name: "David Brown", isOnline: false, lastSeen: "last seen yesterday" },
  { id: "7", name: "Eva Green", isOnline: true },
  { id: "8", name: "Frank Miller", isOnline: false, lastSeen: "last seen 3d ago" },
  { id: "9", name: "Grace Lee", isOnline: true },
];

// todo: remove mock data
const mockMessages: Record<string, MessageBubbleProps[]> = {
  "1": [
    { id: "m1", content: "Hey! How's it going?", timestamp: "2:30 PM", isOwn: false, senderName: "Alice" },
    { id: "m2", content: "Pretty good! Just finished that project.", timestamp: "2:31 PM", isOwn: true, status: "read" },
    { id: "m3", content: "Nice! We should celebrate", timestamp: "2:32 PM", isOwn: false, senderName: "Alice" },
    { id: "m4", content: "Are you coming to the party tonight?", timestamp: "2:34 PM", isOwn: false, senderName: "Alice" },
  ],
  "2": [
    { id: "m5", content: "Team, I've updated the project timeline.", timestamp: "12:00 PM", isOwn: false, senderName: "Mike" },
    { id: "m6", content: "Looks good to me!", timestamp: "12:15 PM", isOwn: true, status: "read" },
    { id: "m7", content: "I'll review the changes today.", timestamp: "12:45 PM", isOwn: false, senderName: "Sarah" },
    { id: "m8", content: "The presentation is ready for review", timestamp: "1:15 PM", isOwn: false, senderName: "Sarah" },
  ],
  "3": [
    { id: "m9", content: "Can you help me with this code review?", timestamp: "Yesterday", isOwn: false, senderName: "Bob" },
    { id: "m10", content: "Sure! Send me the PR link", timestamp: "Yesterday", isOwn: true, status: "read" },
    { id: "m11", content: "Done! Take a look when you can", timestamp: "Yesterday", isOwn: false, senderName: "Bob" },
    { id: "m12", content: "Thanks for your help with the code review!", timestamp: "Yesterday", isOwn: false, senderName: "Bob" },
  ],
};

function TeleChat() {
  const isMobile = useIsMobile();
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [showProfile, setShowProfile] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [messages, setMessages] = useState(mockMessages);

  const allChats = [...mockChats, ...mockGroups];
  const selectedChat = allChats.find((chat) => chat.id === selectedChatId);
  const chatMessages = selectedChatId ? messages[selectedChatId] || [] : [];

  const handleSendMessage = (content: string) => {
    if (!selectedChatId) return;

    const newMessage: MessageBubbleProps = {
      id: `m${Date.now()}`,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage],
    }));
  };

  const handleSelectContact = (contactId: string) => {
    const existingChat = allChats.find((chat) => chat.id === contactId);
    if (existingChat) {
      setSelectedChatId(contactId);
    } else {
      console.log("Start new chat with contact:", contactId);
      setSelectedChatId(contactId);
    }
  };

  const handleCreateGroup = (memberIds: string[], groupName: string) => {
    console.log("Create group:", groupName, "with members:", memberIds);
  };

  const showSidebar = !isMobile || !selectedChatId;
  const showChat = !isMobile || selectedChatId;

  return (
    <div className="h-screen w-full flex overflow-hidden bg-background">
      {showSidebar && (
        <ChatSidebar
          chats={mockChats}
          groups={mockGroups}
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
          onNewChat={() => setShowNewChat(true)}
          onNewGroup={() => setShowNewChat(true)}
          onSettings={() => console.log("Settings")}
        />
      )}

      {showChat && (
        <div className="flex-1 flex">
          {selectedChat ? (
            <ChatWindow
              chat={{
                id: selectedChat.id,
                name: selectedChat.name,
                isOnline: (selectedChat as any).isOnline,
                isGroup: (selectedChat as any).isGroup,
                memberCount: (selectedChat as any).memberCount,
              }}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              onBack={() => setSelectedChatId(undefined)}
              onProfileClick={() => setShowProfile(true)}
              showBackButton={isMobile}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-accent/20">
              <div className="text-center text-muted-foreground">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent/50 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-muted-foreground/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Welcome to TeleChat</h2>
                <p className="text-sm">Select a chat to start messaging</p>
              </div>
            </div>
          )}

          {showProfile && selectedChat && !isMobile && (
            <ProfilePanel
              name={selectedChat.name}
              isOnline={(selectedChat as any).isOnline}
              bio={(selectedChat as any).bio}
              username={(selectedChat as any).username}
              phone={(selectedChat as any).phone}
              isGroup={(selectedChat as any).isGroup}
              memberCount={(selectedChat as any).memberCount}
              sharedMedia={[
                { type: "image", count: 42 },
                { type: "file", count: 12 },
                { type: "link", count: 8 },
                { type: "audio", count: 3 },
              ]}
              onClose={() => setShowProfile(false)}
              onMuteToggle={() => console.log("Mute toggled")}
            />
          )}
        </div>
      )}

      <NewChatDialog
        open={showNewChat}
        onClose={() => setShowNewChat(false)}
        contacts={mockContacts}
        onSelectContact={handleSelectContact}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TeleChat />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
